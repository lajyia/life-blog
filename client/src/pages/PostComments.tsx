import React, { FC, useState, useEffect } from 'react';
import '../styles/PostComments.css';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { PostService } from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import { IPost } from '../types/types';
import Loader from '../components/UI/Loader/Loader';
import PostItem from '../components/PostItem';
import CommentsList from '../components/CommentsList';
import { IComment } from '../types/types';
import { IRootState } from '../store';
import { useSelector } from 'react-redux';
import { addCommentAction } from '../store/commentReducer';
import { decrementCommentCounterAction, incrementCommentCounterAction } from '../store/commentCounter';
import { useAppDispatch } from '../hooks/useAppDispatch';


const PostComments: FC = () => {
    const params = useParams();
    const idPost = params.id;

    const profile = useSelector((state: IRootState) => state.user.user);

    const [post, setPost] = useState<IPost>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const dispatch = useAppDispatch();


    const [changeComment, setChangeComment] = useState({ body: '', id: '' });

    const [comment, setComment] = useState<string>('');

    const addComment = async () => {
        const response = await PostService.addComment(idPost, comment);


        if (response.message !== true) {
            return false
        }


        const newComment = {
            _id: String(Date.now()),
            user: profile._id,
            body: comment
        }

        setComments([...comments, newComment]);

        setComment('');

        dispatch(incrementCommentCounterAction())
    }

    const changeStateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    let postId: string;

    const [fetchPost, postLoading, postError] = useFetching(async () => {
        const response = await PostService.getPost(idPost);

        postId = response._id

        setPost(response);
        fetchComments();
    })

    const [fetchComments, commentsLoading, commentsError] = useFetching(async () => {
        const response = await PostService.getComments(postId);
        setComments(response.comments.comments);
    })

    useEffect(() => {
        fetchPost();
    }, [])

    if (commentsLoading) {
        return (
            <div>
                <Header />
                <Loader />
            </div>
        )
    }

    const deleteComment = async (id: string) => {

        const response = await PostService.deleteComment(idPost, id);

        if (response.data.message !== true) {
            return false
        }

        setComments(comments.filter(comment => comment._id !== id));
        dispatch(decrementCommentCounterAction());
    }

    const startUpdateComment = (id: string, body: string) => {
        setIsUpdate(true);
        setComment(body);
        setChangeComment({ id, body });
    }

    const updateComment = async () => {

        dispatch(addCommentAction({ comment: comment, id: changeComment.id }));

        await PostService.updateComment(idPost, changeComment.id, comment);

        setIsUpdate(false);
        setComment('');

    }


    return (
        <div>
            {post
                ? <div className="post-page post-comments">
                    <Header />
                    <div className="post-page__container">
                        <PostItem postPage={true} full={true} post={post} />
                        <div className="post__comments-block">
                            <CommentsList startUpdateComment={startUpdateComment} deleteComment={deleteComment} comments={comments} />
                            <div className="post__add-comment-body">
                                <input value={comment} onChange={changeStateComment} type="text" className="post__input-add-comment" />
                                {isUpdate
                                    ? <div onClick={updateComment} className="post-comment-button post__update-comment-button">Update</div>
                                    : <div onClick={addComment} className="post-comment-button post__add-comment-button">Send</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : <Loader />
            }
        </div>
    )
};

export default PostComments;