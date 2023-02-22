import React, { FC, useEffect, useState } from 'react';
import Header from '../components/Header';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import '../styles/Feed.css';
import { IPost } from '../types/types';
import { PostService } from '../API/PostService';
import Modal from '../components/UI/Modal/Modal';
import Loader from '../components/UI/Loader/Loader';

const Feed: FC = () => {

    const [posts, setPosts] = useState<IPost[]>([]);

    const jwt = localStorage.getItem('jwt');

    const [fetchPost, postLoading, postErrors] = useFetching(async () => {
        const response = await PostService.getPosts(jwt);

        const responsePosts = response.data.posts;
        setPosts(responsePosts);

        console.log(response.data.likedPosts)
    });

    if (postLoading){
        <div>
            <Header/>
            <Loader/>
        </div>
    }

    useEffect(() =>{

        if (jwt){
            fetchPost();
        }
        
    }, [])

return (
    <div className='feed'>
        <Header />
        <div className="feed__body">
            <div className="feed__container">
                <Modal />
                <PostList posts={posts} />
            </div>
        </div> 
    </div>
);
};

export default Feed;