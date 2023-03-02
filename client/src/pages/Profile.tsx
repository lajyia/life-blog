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
import { useNavigate } from 'react-router-dom';
import LoaderAvatar from '../components/UI/LoaderAvatar/LoaderAvatar';
import Magnifier from '../images/magnifier.svg'

const Profile: FC = () => {


    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [subs, setSubs] = useState<IUser[]>([]);


    let subsLength = 0;

    const [fetchUser, userLoading, userError] = useFetching(async () => {
        const response = await UserService.getProfileByJWT();
        const user = response.candidate

        if (!user) {
            navigate('/login');
        }

        setUser(user);
        subsLength = user.subscribers;
        fetchSubs();
        if (user.posts) {
            authorPosts();
        }
    })
    const [authorPosts, authorPostsLoading, authorPostsError] = useFetching(async () => {
        const response = await PostService.getAuthorPosts();
        setPosts(response.data.posts);
    })

    const [fetchSubs, subsLoading, subsError] = useFetching(async () => {
        const response = await UserService.getSubscribers();

        const subsMiddle = [];

        for (let i = 0; i < response.length; i++) {
            const profileSub = await UserService.getProfileById(response[i]);
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
    const rootProfileSubscribersClasses = ['profile__subscribers'];

    const rootProfilePostsClasses = ['profile__posts'];

    if (userLoading) {
        rootProfilePostsClasses.push('loading')
    }

    if (user?.subscribers === 0) {
        rootProfileSubscribersClasses.push('none');
    }


    const deletePost = async (id: string) => {

        const response = await PostService.deletePost(id);

        if (response.data.message === true) {
            setPosts(posts.filter(post => post._id !== id));
        } else {
            return alert(response.data.message);
        }


    }

    return (
        <div className='profile'>
            <Header />
            <div className="profile__page-body">
                <div className="profile__page-container">
                    <ProfileBody isFollow={false} avatar={user?.avatar} nickname={user?.nickname} bio={user?.bio} me={true} linkName={user?.linkName} />
                    <div className="profile__content-body">
                        <div className={rootProfilePostsClasses.join(' ')}>
                            {authorPostsLoading
                                ? <LoaderItems />
                                : <div>
                                    {posts
                                        ? <div>{
                                            posts.length > 0
                                                ? <AuthorPostsList me={true} deletePost={deletePost} posts={posts} />
                                                : <div className="posts-not-found">
                                                    <img className="posts-not-found__image" src={Magnifier} alt="" />
                                                    <div className="posts-not-found__text">Posts Not Found</div>
                                                </div>
                                        }</div>
                                        : <div>
                                            {
                                                posts
                                                    ? <AuthorPostsList me={true} deletePost={deletePost} posts={posts} />
                                                    : <div className="posts-not-found">
                                                        <img className="posts-not-found__image" src={Magnifier} alt="" />
                                                        <div className="posts-not-found__text">Posts Not Found</div>
                                                    </div>
                                            }
                                        </div>
                                    }
                                </div>
                            }

                        </div>
                        <div className={rootProfileSubscribersClasses.join(' ')}>
                            <div className="profile__counter-subscribers">
                                <span className="profile__text-subscribers">Subscribers</span>
                                <span className="profile__item-counter-subscribers">{user?.subscribers}</span>
                            </div>
                            <div className="profile__body-subscribers">
                                {subsLoading
                                    ? <LoaderAvatar />
                                    : <SubscribersList subs={subs} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;