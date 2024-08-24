import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "./index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/Config";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
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

    return <div>PostForm</div>;
  };
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
