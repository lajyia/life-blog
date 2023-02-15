import React, { FC, useEffect, useState } from 'react';
import Header from '../components/Header';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import '../styles/Feed.css';
import { IPost } from '../types/types';
import { PostService } from '../API/PostService';

const Feed: FC = () => {

    const [posts, setPosts] = useState<IPost[]>([]);

    const [fetchPost, postLoading, postErrors] = useFetching(async () =>{
        const response = await PostService.getPost();
        setPosts(response.data);
    });

    useEffect(() =>{
        fetchPost();
    }, [])

    return (
        <div className='feed'>
            <Header />
            <div className="feed__container">
                <PostList posts={posts}/>
            </div>
        </div>
    );
};

export default Feed;