import React, { FC } from 'react';
import { IPost } from '../types/types';
import '../styles/PostItem.css';

interface PostItemProps{
    post: IPost
}

const PostItem: FC<PostItemProps> = ({post}) => {

    const path = 'http://localhost:4000/posts/' + post.image;


    return (
        <div className='post'>
            <div className="post__top">
                <div className="post__title">{post.title}</div>
            </div>
            <div className="post__body">{post.body}
                <img src={path} alt="" />
            </div>
            <div className="post__info">
                likes: {post.likes}
                comments: {post.comments}
            </div>
        </div>
    );
};

export default PostItem;