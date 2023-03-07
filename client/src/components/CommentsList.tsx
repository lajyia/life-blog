import React, { FC } from 'react';
import '../styles/CommentsList.css';
import { IComment } from '../types/types';
import CommentsItem from './CommentsItem';

interface CommentsListProps {
    comments: IComment[]
}


const CommentsList: FC<CommentsListProps> = ({ comments }) => {

    return (
        <div className='comments-list'>
            {comments.map(comment =>
                <CommentsItem key={comment._id} comment={comment} />
            )}
        </div>
    );
};

export default CommentsList;