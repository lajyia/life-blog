import React, { FC } from 'react';
import { IPost } from '../types/types';
import '../styles/AuthorPostsList.css';
import AuthorPostsItem from './AuthorPostsItem';


interface AuthorPostsListProps{
    posts: IPost[];
    me: boolean;
    deletePost?: (id: string) => void;
}

const AuthorPostsList: FC<AuthorPostsListProps> = ({posts, me, deletePost}) => {

    return (
        <div className='author-list'>
            {posts.map(post => 
                <AuthorPostsItem deletePost={deletePost} me={me} key={post._id} post={post}/>
            )}
        </div>
    );
};

export default AuthorPostsList;