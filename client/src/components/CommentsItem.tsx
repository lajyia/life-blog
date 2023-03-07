import React, { FC, useEffect, useState } from 'react';
import '../styles/CommentsItem.css';
import { IComment, IUser } from '../types/types';
import DefaultAvatar from '../images/default-avatar.svg';
import { useFetching } from '../hooks/useFetching';
import { UserService } from '../API/UserService';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import Delete from '../images/delete.svg';
import Pencil from '../images/pencil.svg';



interface CommentsItemProps {
    comment: IComment,
    deleteComment : (id: string) => void
}

const CommentsItem: FC<CommentsItemProps> = ({ comment, deleteComment }) => {

    const [user, setUser] = useState<IUser>();
    const [pathImage, setPathImage] = useState<string>('');

    const pathUser = 'http://localhost:4000/users/' + pathImage;


    const profile = useSelector((state: IRootState) => state.user.user);

    const [fetchProfile, profileLoading, profileError] = useFetching(async () => {
        const response = await UserService.getProfileById(comment.user);

        if (response.avatar) {
            setPathImage(response.avatar);
        }

        setUser(response);
    })


    const rootCommentsItemAvatarClasses = ['comment-item__avatar'];

    if (!pathImage) {
        rootCommentsItemAvatarClasses.push('default')
    }

    useEffect(() => {
        fetchProfile();
    }, [])


    let linkToProfile = '';


    if (user) {
        {
            profile.nickname == user.nickname
            ? linkToProfile = '/profile'
            : linkToProfile = `/user/${user?.nickname.toLowerCase()}`
        }
    }

    const removeComment = () =>{
        deleteComment(comment._id);
    }

    return (
        <div className="comment-item">
            <div className="comment-item__body-left">
                <Link to={linkToProfile} className={rootCommentsItemAvatarClasses.join(' ')}>
                    <img src={pathImage ? pathUser : DefaultAvatar} alt="" />
                </Link>
                <div className="comment-item__body">
                    <Link to={linkToProfile} className="comment-item__nickname">{user?.nickname}</Link>
                    <div className="comment-item__text-comment">{comment.body}</div>
                </div>
            </div>
            <div className="comment-item__body-services">
                <img onClick={removeComment} className='comment-item__image-delete-comment' src={Delete} alt="" />
                <img className='comment-item__image-update-comment' src={Pencil} alt="" />
            </div>
        </div>
    );
};

export default CommentsItem;