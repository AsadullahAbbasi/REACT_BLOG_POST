import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  // Use useEffect to fetch posts when the component mounts
  useEffect(() => {
    // Fetch posts and update state
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div className="w-full py-8">
      <Container className="flex flex-wrap justify-evenly gap-7">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default AllPosts;
