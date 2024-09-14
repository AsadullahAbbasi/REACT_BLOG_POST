import React from "react";
import { useEffect, useState } from "react";
import { PostForm, Container } from "../components";
import appwriteService from "../appwrite/config"
import { useParams, useNavigate } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams(); //from url we will add optional param in route
  const navigate = useNavigate();
  useEffect(
    () => {
      if (slug) {
        appwriteService.getPost(slug).then((Post) => {
          if (Post) setPost(Post);
          else navigate("/"); 
        })
      }
    }
    , [slug, navigate]
  ) 

  return post ? <div className="w-full py-8">
    < Container>
      <PostForm post={post} />
    </Container>
  </div> : null
}

export default EditPost;
