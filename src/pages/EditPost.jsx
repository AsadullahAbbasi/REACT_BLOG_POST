import React from "react";
import { useEffect, useState } from "react";
import { PostForm, Container } from "../components";
import appwriteService from "../appwrite/Config";
import { useParams, useNavigate } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();
  return <div>EditPost</div>;
}

export default EditPost;
