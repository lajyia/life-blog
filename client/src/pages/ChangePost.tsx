import React, { FC, useEffect, useState, useRef } from 'react';
import '../styles/ChangePost.css';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { IPost } from '../types/types';
import { useFetching } from '../hooks/useFetching';
import { PostService } from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import Plus from '../images/plus.svg';
import Delete from '../images/delete-mobile.svg';


const ChangePost: FC = () => {

    const [post, setPost] = useState<IPost>();
    const [pathImage, setPathImage] = useState<string>();
    const [image, setImage] = useState<Blob | string>('');

    const navigate = useNavigate();


    const params = useParams();
    const idPost = params.id;


    const inputRef = useRef<HTMLInputElement>(null)

    const [fetchPost, postLoading, postError] = useFetching(async () => {
        const response = await PostService.getPost(idPost);
        setPost(response);
        setPathImage(response.image);
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

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setPathPreviewImage(url);
        }
    }

    const removeImage = () => {
        setImage('');
        setPathPreviewImage('');
        setPathImage('');
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }


    const updatePost = async () => {
        const formData = new FormData();

        if (post) {
            formData.append("title", post.title);
            formData.append("body", post.body);


            if (pathPreviewImage) {
                formData.append("image", image)
            }
            if (!pathImage && !image) {
                formData.append('image', '')
            }
            if (pathImage && !image) {
                formData.append('image', 'exist');
            }

            formData.append('id', post._id);

            const response = await PostService.updatePost(formData);

            if (response.data.message === true) {
                navigate('/profile');
            } else {
                alert(response.data.message)
            }

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
                                        <div className="create-post__left-buttons">
                                            <label className="create-post__title-image" htmlFor="create-post-image">Add image</label>
                                            <label className="create-post__title-image create-post__title-image-mobile" htmlFor="create-post-image">
                                                <img src={Plus} alt="" />
                                            </label>
                                            <div onClick={removeImage} className="create-post__remove-image-button">Remove image</div>
                                            <div onClick={removeImage} className="create-post__remove-image-button create-post__remove-image-button-mobile">
                                                <img src={Delete} alt="" />
                                            </div>
                                        </div>
                                        <div onClick={updatePost} className="create-post__send-button">Update</div>
                                    </div>
                                    <input ref={inputRef} id="create-post-image" onChange={changeImage} type="file" className='create-post__file-input' />
                                </div>
                            </form>
                        </div>
                        <div className="create-post__preview-block">
                            <div className="create-post__preview-title">{post?.title}</div>
                            <div className="create-post__preview-body">{post?.body}</div>
                            <div className="create-post__preview-image">
                                {pathPreviewImage
                                    ? <img src={pathPreviewImage} />
                                    : <div>
                                        {pathImage
                                            ? <img src={pathPost} />
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