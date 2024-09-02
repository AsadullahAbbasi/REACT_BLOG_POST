import React from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/Config";
import { useEffect, useState } from "react";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  //as we need all posts so we have overwrited the default query
  return (
    <div className="w-full py-8">
      <Container>
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard post={post} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default AllPosts;
