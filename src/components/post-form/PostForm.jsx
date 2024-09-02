import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/Config";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    //data from rhform
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null; // provided image object
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      // upper updated image in bucket now we have to update post
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined, //file id that we get from appwrite after uploading image
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null; // provided image object
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: file ? file.$id : undefined, //file id that we get from appwrite after uploading image
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
        //no braces if one statement is being returned and function will exit if cond is true
        return value
          .trim()
          .toLowerCase()
          .replace(/^[a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");

      return ""; //runs if upper condition is false
    }, []);

    React.useEffect(() => {
      // subscription triggers callback when value changes
      //wrote clenaup function to unsubscribe or to stop listening to chnages return by subscribtion
      //in first param we get obejct with all form fields as name and and value as value and in second we get objetc which content name of current field we chnaged type and values object inside it again so we destructure name out of second param
      const subscription = watch((value, { name, type }) => {
        if (name === "title") {
          const slug = slugTransform(value.title);
          setValue("slug", slug, { shouldValidate: true }); // do validation immediately and set error on run time
        }
      });

      return () => subscription.unsubscribe(); // cleanup funtion when component will unmount
    }, [watch, slugTransform, setValue]); //no benefit because these funcs are stable and wont change so we only subscribe to chnages once on initial mount and unsubcribe on unmount
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
export default PostForm;

// memo hook to prevent unnecessary re-renders when parent conponent which is passing props re renders so by default child also renders so memo hook will prevent unnecessary re-renders
//but if we are providing function in props then we memo is not effective so we use usecallback in oarent where we are providing function in props and we stop that funtion to create new instance every time until its dependency changes
// while usememo is to prevent unnecessary re calculation that takes too much time

// state we  are getting in callback function holds the entire store and we have access our slice name and then data inside it

//flow of code

// If a post is provided (Update Operation):

// The form is in "edit mode" to update an existing post.
// It checks if a new image is provided (data.image[0]). If yes, it uploads the new image using appwriteService.uploadFile.
// If a new image is uploaded successfully, the old image (associated with the post) is deleted using appwriteService.deleteFile.
// The post is updated with the new data (including the updated or unchanged featured image) using appwriteService.updatePost.
// If the update is successful (dbPost is truthy), the user is navigated to the updated post’s detail page (/post/${dbPost.$id}).

// If no post is provided (Create Operation):

// The form is in "create mode" to create a new post.
// It uploads the selected image file (data.image[0]) using appwriteService.uploadFile.
// If the image is uploaded successfully, it proceeds to create a new post with the form data, including the uploaded image ID (fileId) and the current user's ID (userData.$id).
// If the post creation is successful (dbPost is truthy), the user is navigated to the new post’s detail page (/post/${dbPost.$id}).
// 3. Slug Handling
// The slugTransform function is memoized using useCallback and is responsible for transforming the post title into a URL-friendly slug.
// useEffect is used to watch changes to the title field. Whenever the title changes, it automatically updates the slug field with a URL-friendly version of the title.
// 4. Rendering the Form
// The form includes inputs for the title, slug, content (rich text editor), featured image (file input), and status (select input).
// Depending on whether the form is in "create" or "edit" mode (post prop presence), the submit button text and styles are adjusted.

//  my q : Let's clarify why the code sets the featuredImage field to undefined when updating a post and no new image file is provided.

// In JavaScript and many APIs, setting a field to undefined means "do not change this field" or "omit this field" in the update operation.
// By setting featuredImage to undefined when no new image file is provided, you're effectively telling the backend (through appwriteService.updatePost) that you do not want to update the featuredImage field. This preserves the existing image associated with the post.

// function App() {
//   // Step 1: Define a piece of state to hold a string value
//   const [title, setTitle] = useState("Hello World");

//   const changeTitle = useCallback(() => {
//     console.log("asad");
//   }, [title]);
//   // Step 2: Use useEffect with title as a dependency
//   useEffect(() => {
//     // This effect runs whenever the 'title' changes
//     console.log("Title has changed:", title);

//     // You can perform other side effects here when 'title' changes
//   }, [changeTitle]); // Only re-run the effect if title changes

//   // Function to simulate a change in the title state

//   return (
//     <div>
//       <h1>{title}</h1>
//       {/* Step 3: Button to change the title, triggering the useEffect */}
//       <button onClick={()=>setTitle(title+1)}>Change Title</button>
//     </div>
//   );
// }

// export default App;

//giving function in useffect dependency runs if funtion insytance has chnaged and we have memoize function using callback remember component re renders if state or props changes

//cleanup function are to unsubscribe or to stop listening to those changes becose these observers run behinfd the scene even if componnet is unmounted so cleanup funtion run in such a way that when componnet mount or initial render we sbscribe and cleanup funtion do not run but if component re render or use effect dependecies are disturbed then cleanup funtion run before running tha useeffect code or subscribing again it removes previous subscription and once we have subscribe and dependencie are not changign so useffect will not run but that callback inside subscription will continue to run

// cleanup funtion runs until whole component is unmounted like conditional rendering where complete compoennt is not rendered then cleanup func will be trigered
