import React, { FC } from 'react';
import { IPost } from '../types/types';
import PostItem from './PostItem';
import '../styles/PostList.css';

interface PostListProps{
    posts: IPost[]
}


const PostList:FC<PostListProps> = ({posts}) => {

    return (
        <div className='list'>
            {posts.map(post =>
                <PostItem post={post} key={post.title}/>
            )}
        </div>
    );
};

export default PostList;