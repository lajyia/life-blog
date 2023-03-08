import React, { FC } from 'react';
import '../styles/CommentsList.css';
import { IComment } from '../types/types';
import CommentsItem from './CommentsItem';

interface CommentsListProps {
    comments: IComment[],
    deleteComment: (id: string) => void,
    startUpdateComment: (id: string, body: string) => void
}


const CommentsList: FC<CommentsListProps> = ({ comments, deleteComment, startUpdateComment}) => {

    return (
        <div className='comments-list'>
            {comments.map(comment =>
                <CommentsItem startUpdateComment={startUpdateComment} deleteComment={deleteComment} key={comment._id} comment={comment} />
            )}
        </div>
    );
};

export default CommentsList;