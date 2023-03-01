import React, { FC, useEffect, useState } from 'react';
import '../styles/PostPage.css';
import { PostService } from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostItem from '../components/PostItem';
import { IPost } from '../types/types';
import Loader from '../components/UI/Loader/Loader';


const Post: FC = () => {

    const params = useParams();
    const idPost = params.id;

    const [post, setPost] = useState<IPost>();

    const [fetchPost, postLoading, postError] = useFetching(async () => {
        const response = await PostService.getPost(idPost);

        setPost(response);

    })

    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <div>
            {post
                ? <div className="post-page">
                    <Header />
                    <div className="post-page__container">
                        <PostItem post={post} />
                    </div>
                </div>
                : <Loader/>
            }
        </div>

    );



};

export default Post;