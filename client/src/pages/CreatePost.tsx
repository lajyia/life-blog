import React, { FC, useState } from 'react';
import '../styles/CreatePost.css';
import Header from '../components/Header';
import { PostService } from '../API/PostService';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/UI/Notification/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../store';
import Cross from '../images/cross.svg';
import { trueVisibleNotificationAction, falseVisibleNotificationAction } from '../store/visibleNotification';

const CreatePost: FC = () => {


    const [post, setPost] = useState({ title: '', body: '', pathImage: '' });
    const [image, setImage] = useState<Blob | string>('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        let title = e.target.value;
        const validTitle = title.substring(0, 40);
        setPost({ ...post, title: validTitle })
    }
    const changeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost({ ...post, body: e.target.value })
    }
    const changePathImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {

            setImage(e.target.files[0]);

            const url = URL.createObjectURL(e.target.files[0]);
            setPost({ ...post, pathImage: url })
        }
    }

    const visibleNotification = useSelector((state: IRootState) => state.visibleNotification.visible);


    const addPost = async () => {

        const formData = new FormData();

        formData.append('image', image);
        formData.append('title', post.title);
        formData.append('body', post.body)


        const response = await PostService.createPost(formData);

        if (response.data.message == true) {
            setPost({ title: '', body: '', pathImage: '' })
            showNotification();
            setTimeout(() =>{
                navigate('/feed');
            }, 3000)
            
        } else {
            return alert(response.data.message)
        }
    }

    const closeNotification = () => {
        dispatch(falseVisibleNotificationAction());
    }
    const showNotification = () => {
        dispatch(trueVisibleNotificationAction())
    }


    return (
        <div className={visibleNotification ? 'create-post-disabled create-post' : 'create-post'}>
            <Header />
            {visibleNotification
                ? <Notification>
                    <div className="notification__text">
                        Post created. Redirect to feed
                    </div>
                    <div className="notification__close-image">
                        <img onClick={closeNotification} src={Cross} alt="" />
                    </div>
                </Notification>
                : <div></div>
            }
            <div className="create-post__body">
                <div className="create-post__container">
                    <div className="create-post__title-form">Create the best post now!</div>
                    <div className="create-post__body-container">
                        <div className="create-post__create-block">
                            <form encType='multipart/form-data' className="create-post__form">
                                <div className="create-post__title">
                                    <div className="create-post__title-title">title:</div>
                                    <input spellCheck="false" onChange={changeTitle} value={post.title} type="text" className="create-post__title-input create-post-input" />
                                </div>
                                <div className="create-post__body">
                                    <div className="create-post__title-body">body:</div>
                                    <textarea spellCheck="false" onChange={changeBody} value={post.body} className='create-post__body-input create-post-input' />
                                </div>
                                <div className="create-post__image">
                                    <div className="create-post__buttons">
                                        <label className="create-post__title-image" htmlFor="create-post-image">Add image</label>
                                        <a onClick={addPost} className="create-post__send-button">Send</a>
                                    </div>
                                    <input id="create-post-image" onChange={changePathImage} type="file" className='create-post__file-input' />
                                </div>
                            </form>
                        </div>
                        <div className="create-post__preview-block">
                            <div className="create-post__preview-title">{post.title}</div>
                            <div className="create-post__preview-body">{post.body}</div>
                            <div className="create-post__preview-image">
                                {post.pathImage
                                    ? <img alt="preview" src={post.pathImage} />
                                    : <div></div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreatePost;