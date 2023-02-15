import React, { FC } from 'react';
import { IPost } from '../types/types';

interface PostItemProps{
    post: IPost
}

const PostItem: FC<PostItemProps> = ({post}) => {
    return (
        <div className='post'>
            <div className="post__top">
                <div className="post__title">{post.title}</div>
            </div>
            <div className="post__body">{post.body}</div>
            <div className="post__info">
                likes: {post.likes}
                comments: {post.comments}
            </div>
        </div>
    );
};

export default PostItem;