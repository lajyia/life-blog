import React, { FC } from 'react';
import { IPost } from '../types/types';
import '../styles/PostItem.css';
import test from '../images/test.jpg';
import like from '../images/like.svg';
import comment from '../images/comment.svg'

interface PostItemProps {
    post: IPost
}

const PostItem: FC<PostItemProps> = ({ post }) => {

    const path = 'http://localhost:4000/posts/' + post.image;


    return (
        <div className='post'>
            <div className="post__top">
                <div className="post__author">
                    <div className="post__image-author">
                        <img className='post__item-image-author' src={test} alt="logo author" />
                    </div>
                    <div className="post__body-author">
                        <div className="post__nickname-author">DEFAULT NAME</div>
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
                    <img src={path} alt=""/>
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