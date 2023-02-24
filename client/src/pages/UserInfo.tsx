import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import { IPost, IUser } from '../types/types';
import UserNotFound from '../components/UserNotFound';
import ProfileBody from '../components/ProfileBody';
import '../styles/UserInfo.css';
import Header from '../components/Header';
import SubscribersList from '../components/SubscribersList';
import LoaderItems from '../components/UI/LoaderItems/LoaderItems';
import AuthorPostsList from '../components/AuthorPostsList';


const UserInfo: FC = () => {

    const [user, setUser] = useState<IUser>();
    const [isMe, setIsMe] = useState<boolean | string>();
    const [posts, setPosts] = useState<IPost[]>([]);

    const params = useParams();
    const userId = params.id;

    const navigate = useNavigate();

    if (isMe) {
        navigate('/profile')
    }

    const subs = [
        { nickname: 'Oleg' },
        { nickname: 'Tyty' },
        { nickname: 'Rozmaridddn' },
        { nickname: 'Tester' },
        { nickname: 'Shishdka' },
        { nickname: 'Vanessa' },
    ]

    const [fetchUser, userLoading, userError] = useFetching(async () => {
        const response = await UserService.getUserInfoById(userId);
        setUser(response.data.user);
        console.log(response.data)
        setPosts(response.data.user.posts);
        checkUser();
    })

    const rootProfilePostsClasses = ['profile__posts'];

    if (userLoading) {
        rootProfilePostsClasses.push('loading')
    }

    const checkUser = async () => {
        const response = await UserService.isMe(userId);
        setIsMe(response.data.message);
    }

    useEffect(() => {
        fetchUser();
    }, [])


    if (userLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            {!user
                ? <UserNotFound />
                : <div className='user-info'>
                    <Header />
                    <div className="user-info__container">
                        <ProfileBody avatar={user.avatar} nickname={user.nickname} me={false} bio={user.bio} linkName={user.linkName} />
                        <div className="profile__content-body">
                            <div className={rootProfilePostsClasses.join(' ')}>
                                <div>
                                    {
                                        posts.length > 0
                                            ? <AuthorPostsList posts={posts} />
                                            : <div>Posts not found</div>
                                    }
                                </div>
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
            }
        </div>
    );
};

export default UserInfo;