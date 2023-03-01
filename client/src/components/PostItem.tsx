import React, { FC, useEffect, useState } from 'react';
import { IPost } from '../types/types';
import '../styles/PostItem.css';
import like from '../images/like.svg';
import comment from '../images/comment.svg';
import DefaultAvatar from '../images/default-avatar.svg';
import { PostService } from '../API/PostService';
import ActiveLike from '../images/active-like.svg';
import { UserService } from '../API/UserService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


interface PostItemProps {
    post: IPost
}

const PostItem: FC<PostItemProps> = ({ post }) => {

    const [pathImage, setPathImage] = useState<boolean | string>();

    const [addLike, setAddLike] = useState<number>(post.likes);
    const [isUserLike, setIsUserLike] = useState<boolean>(post.isLiked);


    const getImage = async () => {
        const response = await PostService.getAvatar(post.author);
        setPathImage(response.data.image)
    }

    const navigate = useNavigate();

    useEffect(() => {
        getImage();
    }, [])

    const pathPost = 'http://localhost:4000/posts/' + post.image;

    const pathUser = 'http://localhost:4000/users/' + pathImage;

    const likePost = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isUserLike) {
            setAddLike(addLike + 1);
            setIsUserLike(true);
            likeToPost();
        }
        else {
            setAddLike(addLike - 1);
            setIsUserLike(false);
            unlikeToPost();
        }
        setTimeout(() => {
            return false
        }, 1000)
    }

    const likeToPost = async () => {
        await UserService.likePost(post._id);
    }

    const unlikeToPost = async () => {
        await UserService.unlikePost(post._id);
    }

    const linkPath = `/user/${post.author.toLowerCase()}`;

    const navigateToUserInfo = () => {
        navigate(linkPath);
    }

    const validBody = `${post.body.substring(0, 300)}`;

    const pathToPost = `/post/${post._id}`;
    const pathToPostComments = `/post/${post._id}/comments`;

    return (
        <div className='post'>
            <div className="post__top">
                <div className="post__author">
                    <div onClick={navigateToUserInfo} className="post__image-author">
                        {pathImage
                            ? <img className='post__item-image-author' src={pathUser} alt="logo author" />
                            : <img style={{ border: '2px solid #868585' }} className='post__item-image-author' src={DefaultAvatar} alt="logo author" />
                        }
                    </div>
                    <div className="post__body-author">
                        <div onClick={navigateToUserInfo} className="post__nickname-author">
                            {post.author}
                        </div>
                        <div className="post__time-post">{post.date}</div>
                    </div>
                </div>
            </div>
            <div className="post__body">
                <Link to={pathToPost} className="post__title">{post.title}</Link>
                <div className="post__text-body">
                    <span className='post__text-text-body'>{validBody}</span>
                    {post.body.length > 400
                        ? <Link to={pathToPost} id="post-dotted">....</Link>
                        : <div></div>
                    }
                </div>
                <div className="post__image-body">
                    <img src={pathPost} alt="" />
                </div>
            </div>
            <div className="post__info">
                <div onClick={likePost} className="post__like-info">
                    <img className="post__image-like" src={isUserLike ? ActiveLike : like} alt="like" />
                    <div className="post__like-count">{addLike}</div>
                </div>
                <Link to={pathToPostComments} className="post__comment-info">
                    <img className="post__image-comment" src={comment} alt="comment" />
                    <div className="post__comment-count">{post.comments}</div>
                </Link>
            </div>
        </div>
    );
};

export default PostItem;