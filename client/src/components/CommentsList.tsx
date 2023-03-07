import React, { FC } from 'react';
import '../styles/CommentsList.css';
import { IComment } from '../types/types';
import CommentsItem from './CommentsItem';

interface CommentsListProps {
    comments: IComment[],
    deleteComment: (id: string) => void
}


const CommentsList: FC<CommentsListProps> = ({ comments, deleteComment }) => {

    return (
        <div className='comments-list'>
            {comments.map(comment =>
                <CommentsItem deleteComment={deleteComment} key={comment._id} comment={comment} />
            )}
        </div>
    );
};

export default CommentsList;