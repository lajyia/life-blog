import React, { FC, useState } from 'react';
import '../styles/CreatePost.css';
import Header from '../components/Header';

const CreatePost: FC = () => {


    const [post, setPost] = useState({ title: '', body: '', pathImage: '' })

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        let title = e.target.value;
        const validTitle = title.substring(0, 40);
        setPost({ ...post, title: validTitle })
        console.log(validTitle.length)
    }
    const changeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost({ ...post, body: e.target.value })
        console.log(e.target.value)
    }
    const changePathImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {

            const url = URL.createObjectURL(e.target.files[0]);
            setPost({ ...post, pathImage: url })
        }
    }


    return (
        <div className="create-post">
            <Header />
            <div className="create-post__body">
                <div className="create-post__container">
                    <div className="create-post__title-form">Create the best post now!</div>
                    <div className="create-post__body-container">
                        <div className="create-post__create-block">
                            <form className="create-post__form">
                                <div className="create-post__title">
                                    <div className="create-post__title-title">title:</div>
                                    <input spellCheck="false" onChange={changeTitle} value={post.title} type="text" className="create-post__title-input create-post-input" />
                                </div>
                                <div className="create-post__body">
                                    <div className="create-post__title-body">body:</div>
                                    <textarea spellCheck="false" onChange={changeBody} value={post.body} className='create-post__body-input create-post-input' />
                                </div>
                                <div className="create-post__image">
                                    <label className="create-post__title-image" htmlFor="create-post-image">Add image</label>                                                                   
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