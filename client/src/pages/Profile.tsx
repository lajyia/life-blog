import React, { FC, useEffect, useState } from 'react';
import '../styles/Profile.css';
import { UserService } from '../API/UserService';
import DefaultAvatar from '../images/default-avatar.svg';
import Header from '../components/Header';
import CoverImage from '../images/cover-image.jpg';


const Profile: FC = () => {

    const [pathImage, setPathImage] = useState<string | boolean>()

    const jwt = localStorage.getItem("jwt");


    const getUser = async () => {
        const response = await UserService.getProfileByJWT(jwt);
        setPathImage(response.avatar)
    }

    const pathUser = 'http://localhost:4000/users/' + pathImage;

    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className='profile'>
            <Header />
            {/* <img className='profile__image-avatar' src={pathImage ? pathUser : DefaultAvatar} alt="" /> */}
        </div>
    );
};

export default Profile;