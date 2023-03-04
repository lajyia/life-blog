import React, { FC } from 'react';
import { IPost } from '../types/types';
import PostItem from './PostItem';
import '../styles/PostList.css';

interface PostListProps{
    posts: IPost[],
    full: boolean,
    postPage: boolean
}


const PostList:FC<PostListProps> = ({posts, full, postPage}) => {

    return (
        <div className='list'>
            {posts.map(post =>
                <PostItem postPage={postPage} full={full} post={post} key={post.title}/>
            )}
        </div>
    );
};

export default PostList;