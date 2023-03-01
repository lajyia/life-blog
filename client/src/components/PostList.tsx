import React, { FC } from 'react';
import { IPost } from '../types/types';
import PostItem from './PostItem';
import '../styles/PostList.css';

interface PostListProps{
    posts: IPost[],
    full: boolean
}


const PostList:FC<PostListProps> = ({posts, full}) => {

    return (
        <div className='list'>
            {posts.map(post =>
                <PostItem full={full} post={post} key={post.title}/>
            )}
        </div>
    );
};

export default PostList;