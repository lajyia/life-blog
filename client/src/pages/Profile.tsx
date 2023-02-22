import React, { FC, useEffect, useState } from 'react';
import '../styles/Profile.css';
import { UserService } from '../API/UserService';
import DefaultAvatar from '../images/default-avatar.svg';
import Header from '../components/Header';
import CoverImage from '../images/cover-image.jpg';
import { IUser } from '../types/types';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';



const Profile: FC = () => {

    const [user, setUser] = useState<IUser>();

    const jwt = localStorage.getItem("jwt");

    const [fetchUser, userLoading, userError] = useFetching(async () => {
        const response = await UserService.getProfileByJWT(jwt);
        const user = response.candidate
        setUser(user);
        console.log(user);
    })


    const pathUser = 'http://localhost:4000/users/' + user?.avatar;

    useEffect(() => {
        fetchUser();
    }, [])


    if (userLoading){
        return(
            <div>
                <Header/>
                <Loader/>
            </div>
        )
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
                            <div className="profile__avatar">
                                <img className='profile__image-avatar' src={pathUser} alt="" />
                            </div>
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

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;