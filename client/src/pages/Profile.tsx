import React, { FC, useEffect, useState } from 'react';
import '../styles/Profile.css';
import { UserService } from '../API/UserService';
import DefaultAvatar from '../images/default-avatar.svg';
import Header from '../components/Header';
import { IPost, IUser } from '../types/types';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import { Link } from 'react-router-dom';
import SubscribersList from '../components/SubscribersList';
import { PostService } from '../API/PostService';
import AuthorPostsList from '../components/AuthorPostsList';
import LoaderItems from '../components/UI/LoaderItems/LoaderItems';


const Profile: FC = () => {

    const [user, setUser] = useState<IUser>();
    const subs = [
        { nickname: 'Oleg' },
        { nickname: 'Tyty' },
        { nickname: 'Rozmaridddn' },
        { nickname: 'Tester' },
        { nickname: 'Shishdka' },
        { nickname: 'Vanessa' },
    ]

    const [posts, setPosts] = useState<IPost[]>([])

    const jwt = localStorage.getItem("jwt");

    const [fetchUser, userLoading, userError] = useFetching(async () => {
        const response = await UserService.getProfileByJWT(jwt);
        const user = response.candidate
        setUser(user);
        if (user.posts) {
            authorPosts();
        }
    })


    const [authorPosts, authorPostsLoading, authorPostsError] = useFetching(async () => {
        const response = await PostService.getAuthorPosts();
        setPosts(response.data.posts);
    })


    const pathUser = 'http://localhost:4000/users/' + user?.avatar;

    useEffect(() => {
        fetchUser();
    }, [])


    if (userLoading) {
        return (
            <div>
                <Header />
                <Loader />
            </div>
        )
    }

    const rootAvatarImageClasses = ['profile__image-avatar'];

    if (!user?.avatar) {
        rootAvatarImageClasses.push('default')
    }

    const rootProfilePostsClasses = ['profile__posts'];

    if (authorPostsLoading){
        rootProfilePostsClasses.push('loading')
    }

    return (
        <div className='profile'>
            <Header />
            <div className="profile__page-body">
                <div className="profile__page-container">
                    <div className="profile__body">
                        <div className="profile__linkname">@{user?.linkName}</div>
                        <div className="profile__cover">
                        </div>
                        <div className="profile__user-info">
                            <div className="profile__head-block-user-info">
                                <div className="profile__avatar">
                                    <img className={rootAvatarImageClasses.join(' ')} src={user?.avatar ? pathUser : DefaultAvatar} alt="" />
                                </div>
                                <div className="profile__blank-avatar"></div>
                                <div className="profile__head-info">
                                    <div className="profile__fio">
                                        <div className="profile__nickname">
                                            <span>{user?.nickname}</span>
                                        </div>
                                    </div>
                                    <div className="profile__bio">
                                        <span>{user?.bio}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="profile__settings-block">
                                <Link className="profile__button-settings" to="/">Edit profile</Link>
                            </div>
                        </div>

                    </div>
                    <div className="profile__content-body">
                        <div className={rootProfilePostsClasses.join(' ')}>
                            {authorPostsLoading
                                ? <LoaderItems/>
                                : <div>
                                    {
                                        posts.length > 0
                                            ? <AuthorPostsList posts={posts} />
                                            : <div>Posts not found</div>
                                    }
                                </div>
                            }

                        </div>
                        <div className="profile__subscribers">
                            <div className="profile__counter-subscribers">
                                <span className="profile__text-subscribers">Subscribers</span>
                                <span className="profile__item-counter-subscribers">{user?.subscribers}</span>
                            </div>
                            <div className="profile__body-subscribers">
                                <SubscribersList subs={subs} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;