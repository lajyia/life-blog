import React, { FC, useEffect, useState } from 'react';
import { IPost } from '../types/types';
import '../styles/PostItem.css';
import like from '../images/like.svg';
import comment from '../images/comment.svg';
import DefaultAvatar from '../images/default-avatar.svg';
import { PostService } from '../API/PostService';

interface PostItemProps {
    post: IPost
}

const PostItem: FC<PostItemProps> = ({ post }) => {


    const [pathImage, setPathImage] = useState<boolean | string>('');


    const getImage = async () => {
        const response = await PostService.getAvatar(post.author);
        setPathImage(response.data.image)
    }


    useEffect(() => {
        getImage();
    }, [])

    const pathPost = 'http://localhost:4000/posts/' + post.image;

    const pathUser = 'http://localhost:4000/users/' + pathImage;


    return (
        <div className='post'>
            <div className="post__top">
                <div className="post__author">
                    <div className="post__image-author">
                        {pathImage
                            ? <img className='post__item-image-author' src={pathUser} alt="logo author" />
                            : <img style={{ border: '2px solid #868585' }} className='post__item-image-author' src={DefaultAvatar} alt="logo author" />
                        }
                    </div>
                    <div className="post__body-author">
                        <div className="post__nickname-author">{post.author}</div>
                        <div className="post__time-post">16 january</div>
                    </div>
                </div>
                <div className="post__title">{post.title}</div>
            </div>
            <div className="post__body">
                <div className="post__text-body">
                    {post.body}
                </div>
                <div className="post__image-body">
                    <img src={pathPost} alt="" />
                </div>
            </div>
            <div className="post__info">
                <div className="post__like-info">
                    <img className="post__image-like" src={like} alt="like" />
                    <div className="post__like-count">{post.likes}</div>
                </div>
                <div className="post__comment-info">
                    <img className="post__image-comment" src={comment} alt="comment" />
                    <div className="post__comment-count">{post.comments}</div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;