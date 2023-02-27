import React, { FC, useEffect, useState } from 'react';
import Header from '../components/Header';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import '../styles/Feed.css';
import { IPost } from '../types/types';
import { PostService } from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const Feed: FC = () => {

    const [posts, setPosts] = useState<IPost[]>([]);

    const jwt = localStorage.getItem('jwt');

    const [fetchPost, postLoading, postErrors] = useFetching(async () => {
        const response = await PostService.getPosts(jwt);

        const responsePosts = response.data.posts;
        setPosts(responsePosts);
    });


    useEffect(() => {

            if (jwt) {
                fetchPost();
            }

        }, [])


    if (postLoading) {
        return (
            <div>
                <Header />
                <Loader />
            </div>
        )

    }

    const rootFeedClasses = ['feed'];

    if (posts){
        rootFeedClasses.push('exists');
    }


    return (
        <div className={rootFeedClasses.join(' ')}>
            <Header />
            <div className="feed__body">
                <div className="feed__container">
                    {posts
                        ? <PostList posts={posts} />
                        : <div>Posts Not Found</div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Feed;