import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => { //there we dont want all posts so we didnt provided any param to getposts function so by defaultparam will work and nly active posts will come
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])  
  
   
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-evenly gap-7'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 '>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home