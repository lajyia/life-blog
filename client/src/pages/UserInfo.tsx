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
import AuthorPostsList from '../components/AuthorPostsList';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import LoaderAvatar from '../components/UI/LoaderAvatar/LoaderAvatar';


const UserInfo: FC = () => {

    const [user, setUser] = useState<IUser>();
    const [isMe, setIsMe] = useState<boolean | string>();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [subs, setSubs] = useState<IUser[]>([]);
    const [isFollow, setIsFollow] = useState<boolean>(false);

    const params = useParams();
    const userId = params.id;

    const navigate = useNavigate();

    if (isMe) {
        navigate('/profile')
    }

    let subsLength = 0

    const userInfo = useSelector((state: IRootState) => state.user.user);

    const [fetchSubs, subsLoading, subsError] = useFetching(async () => {
        const response = await UserService.getSubscribersUser(idUser);

        setIsFollow(response.follow);

        const subsMiddle = [];

        for (let i = 0; i < response.subs.subs.length; i++) {
            const profileSub = await UserService.getProfileById(response.subs.subs[i]);
            subsMiddle.push(profileSub);
        }

        if (subsLength <= 5) {
            subsLength = 5;
        }
        if (subsLength <= 10) {
            subsLength = 10
        }
        if (subsLength > 10) {
            subsLength = 10
        }

        subsMiddle.length = subsLength;

        setSubs(subsMiddle)
    })
    let idUser = '';

    const [fetchUser, userLoading, userError] = useFetching(async () => {
        const response = await UserService.getUserInfoById(userId);
        setUser(response.data.user);
        setPosts(response.data.user.posts);

        idUser = response.data.user._id;
        fetchSubs();

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
    }, [userId])


    if (userLoading) {
        return (
            <Loader />
        )
    }


    const rootProfileSubscribersClasses = ['profile__subscribers'];

    if (user?.subscribers == 0) {
        rootProfileSubscribersClasses.push('none');
    }
    if (user) {
        if (user?.subscribers <= 5) {
            rootProfileSubscribersClasses.push('five')
        }
    }

    const follow = async () => {
        setIsFollow(true);

        if (user) {
            const response = await UserService.follow(user._id);
            if (response.status == 200) {
                setSubs([...subs, userInfo]);
            }
        }

    }
    const unfollow = async () => {
        setIsFollow(false);

        if (user) {
            const response = await UserService.unfollow(user._id);
            if (response.status == 200) {
                setSubs(subs.filter(subs => subs._id !== userInfo._id))
            }
        }
    }

    return (
        <div>
            {!user
                ? <UserNotFound />
                : <div className='user-info'>
                    <Header />
                    <div className="user-info__container">
                        <ProfileBody follow={follow} unfollow={unfollow} isFollow={isFollow} avatar={user.avatar} nickname={user.nickname} me={false} bio={user.bio} linkName={user.linkName} />
                        <div className="profile__content-body">
                            <div className={rootProfilePostsClasses.join(' ')}>
                                <div>
                                    {
                                        posts
                                            ? <AuthorPostsList posts={posts} />
                                            : <div>Posts not found</div>
                                    }
                                </div>
                            </div>
                            {subsLoading
                                ? <LoaderAvatar />

                                : <div className={rootProfileSubscribersClasses.join(' ')}>
                                    <div className="profile__counter-subscribers">
                                        <span className="profile__text-subscribers">Subscribers</span>
                                        <span className="profile__item-counter-subscribers">{subs.length}</span>
                                    </div>
                                    <div className="profile__body-subscribers">
                                        <SubscribersList subs={subs} />
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserInfo;