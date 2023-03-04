import React, { useState, useEffect, FC } from 'react';
import { IPost } from '../types/types';
import '../styles/AuthorPostsItem.css';
import { UserService } from '../API/UserService';
import { PostService } from '../API/PostService';
import DefaultAvatar from '../images/default-avatar.svg';
import ActiveLike from '../images/active-like.svg';
import comment from '../images/comment.svg';
import like from '../images/like.svg';
import { Link } from 'react-router-dom';
import Delete from '../images/delete.svg';
import Pencil from '../images/pencil.svg';


interface AuthorPostsItemProps {
    post: IPost,
    me: boolean,
    deletePost?: (id: string) => void;
}

const AuthorPostsItem: FC<AuthorPostsItemProps> = ({ post, me, deletePost }) => {


    const [pathImage, setPathImage] = useState<boolean | string>();

    const [addLike, setAddLike] = useState<number>(post.likes);
    const [isUserLike, setIsUserLike] = useState<boolean>(post.isLiked);


    const getImage = async () => {
        const response = await PostService.getAvatar(post.author);
        setPathImage(response.data.image)
    }

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

    const pathToPost = `/post/${post._id}`;
    const pathToPostComments = `/post/${post._id}/comments`;


    const validBody = `${post.body.substring(0, 300)}`;

    useEffect(() => {
        getImage()
    }, [])

    const removePost = () => {
        if (deletePost) {
            deletePost(post._id);
        }
    }

    const pathToChange = `/post/${post._id}/change`;


    return (
        <div className="author-post">
            <div className="author-post__top post__top">
                <div className="author-post__author-info post__author">
                    <div className="author-post__body-author-info">
                        <div className="post__image-author post-author__image-author">
                            {pathImage
                                ? <img className='post__item-image-author' src={pathUser} alt="logo author" />
                                : <img style={{ border: '2px solid #868585' }} className='post__item-image-author' src={DefaultAvatar} alt="logo author" />
                            }
                        </div>
                        <div className="post__body-author author-post__body-author">
                            <div className="post__nickname-author post-author__nickname-author">{post.author}</div>
                            <div className="post__time-post">{post.date}</div>
                        </div>
                    </div>
                    {me
                        ? <div className="author-post__top-buttons">
                            <div onClick={removePost} className="author-post__delete">
                                <img className='author-post__image-delete' src={Delete} alt="" />
                            </div>
                            <Link to={pathToChange} className="author-post__change">
                                <img src={Pencil} alt="" className="author-post__image-change" />
                            </Link>
                        </div>
                        : <div></div>
                    }

                </div>
            </div>
            <div className="author-post__body">
                <div className="author-post__top-body">
                    <Link to={pathToPost} className="author-post__title post__title">{post.title}</Link>
                    <div className="author-post__text-body post__text-body">
                        <span className='post__text-text-body'>{validBody}</span>
                        {post.body.length > 400
                            ? <Link to={pathToPost} id="post-dotted">....</Link>
                            : <div></div>
                        }
                    </div>
                </div>
                <div className="author-post__image-body">

                    {post.image
                        ? <img src={pathPost} alt="" />
                        : <div></div>
                    }

                    
                </div>
            </div>
            <div className="author-post__info post__info">
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

export default AuthorPostsItem;