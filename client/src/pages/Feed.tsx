import React, { FC, useEffect, useState } from 'react';
import Header from '../components/Header';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import '../styles/Feed.css';
import { IPost } from '../types/types';
import { PostService } from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import Magnifier from '../images/magnifier.svg'

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

    if (posts) {
        rootFeedClasses.push('exists');
    }


    return (
        <div className={rootFeedClasses.join(' ')}>
            <Header />
            <div className="feed__body">
                <div className="feed__container">
                    {posts
                        ? <PostList postPage={false} full={false} posts={posts} />
                        : <div className="posts-not-found">
                            <img className="posts-not-found__image" src={Magnifier} alt="" />
                            <div className="posts-not-found__text">Posts Not Found</div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Feed;