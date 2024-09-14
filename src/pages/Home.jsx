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
  
    if (posts.length === 0) { //if true then this will render and exit the function and if false then it will render below code
        return ( 
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap  ">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home