import React, { FC, useEffect, useState } from 'react';
import '../styles/ChangePost.css';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { IPost } from '../types/types';
import { useFetching } from '../hooks/useFetching';
import { PostService } from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';


const ChangePost: FC = () => {

    const [post, setPost] = useState<IPost>();
    const [pathImage, setPathImage] = useState();

    const params = useParams();
    const idPost = params.id;

    const [fetchPost, postLoading, postError] = useFetching(async () => {
        const response = await PostService.getPost(idPost);
        setPost(response);
        setPathImage(response.image)
    })

    useEffect(() => {
        fetchPost();
    }, [])


    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (post) {
            setPost({ ...post, title: e.target.value })
        }

    }

    const changeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (post) {
            setPost({ ...post, body: e.target.value })
        }
    }

    const [pathPreviewImage, setPathPreviewImage] = useState<string>();
    const [image, setImage] = useState<Blob | string>('');

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files){
            setImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setPathPreviewImage(url);
        }
    }

    const updatePost = async () => {
        const formData = new FormData();

        if (post) {
            formData.append("title", post.title);
            formData.append("body", post.body);
            formData.append("image", image)
            formData.append('id', post._id);


            const response = await PostService.updatePost(formData);

            console.log(response.data);
        }

        
    }


    const pathPost = 'http://localhost:4000/posts/' + pathImage;

    if (postLoading) {
        return (
            <div>
                <Header />
                <Loader />
            </div>
        )
    }


    return (
        <div className="change-post create-post">
            <Header />
            <div className="create-post__body">
                <div className="create-post__container">
                    <div className="create-post__title-form">Update the best post now!</div>
                    <div className="create-post__body-container">
                        <div className="create-post__create-block">
                            <form encType='multipart/form-data' className="create-post__form">
                                <div className="create-post__title">
                                    <div className="create-post__title-title">title:</div>
                                    <input spellCheck="false" onChange={changeTitle} value={post?.title} type="text" className="create-post__title-input create-post-input" />
                                </div>
                                <div className="create-post__body">
                                    <div className="create-post__title-body">body:</div>
                                    <textarea spellCheck="false" onChange={changeBody} value={post?.body} className='create-post__body-input create-post-input' />
                                </div>
                                <div className="create-post__image">
                                    <div className="create-post__buttons">
                                        <label className="create-post__title-image" htmlFor="create-post-image">Add image</label>
                                        <div onClick={updatePost} className="create-post__send-button">Update</div>
                                    </div>
                                    <input id="create-post-image" onChange={changeImage} type="file" className='create-post__file-input' />
                                </div>
                            </form>
                        </div>
                        <div className="create-post__preview-block">
                            <div className="create-post__preview-title">{post?.title}</div>
                            <div className="create-post__preview-body">{post?.body}</div>
                            <div className="create-post__preview-image">
                                {pathPreviewImage
                                    ? <img src={pathPreviewImage}/>
                                    : <div>
                                        {pathImage
                                            ? <img src={pathPost}/>
                                            : <div></div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChangePost;