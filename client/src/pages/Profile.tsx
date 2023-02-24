import React, { FC, useEffect, useState } from 'react';
import '../styles/Profile.css';
import { UserService } from '../API/UserService';
import Header from '../components/Header';
import { IPost, IUser } from '../types/types';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import SubscribersList from '../components/SubscribersList';
import { PostService } from '../API/PostService';
import AuthorPostsList from '../components/AuthorPostsList';
import LoaderItems from '../components/UI/LoaderItems/LoaderItems';
import ProfileBody from '../components/ProfileBody';


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

    const rootProfilePostsClasses = ['profile__posts'];

    if (userLoading) {
        rootProfilePostsClasses.push('loading')
    }

    return (
        <div className='profile'>
            <Header />
            <div className="profile__page-body">
                <div className="profile__page-container">
                    <ProfileBody avatar={user?.avatar} nickname={user?.nickname} bio={user?.bio} me={true} linkName={user?.linkName}/>
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