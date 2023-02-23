import React, { FC } from 'react';
import { IPost } from '../types/types';
import '../styles/AuthorPostsList.css';
import AuthorPostsItem from './AuthorPostsItem';


interface AuthorPostsListProps{
    posts: IPost[];
}

const AuthorPostsList: FC<AuthorPostsListProps> = ({posts}) => {
    return (
        <div className='author-list'>
            {posts.map(post => 
                <AuthorPostsItem key={post._id} post={post}/>
            )}
        </div>
    );
};

export default AuthorPostsList;