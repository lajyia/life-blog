import React, { FC } from 'react';
import { IPost } from '../types/types';
import PostItem from './PostItem';

interface PostListProps{
    posts: IPost[]
}


const PostList:FC<PostListProps> = ({posts}) => {
    return (
        <div>
            {posts.map(post =>
                <PostItem post={post} key={post._id}/>
            )}
        </div>
    );
};

export default PostList;