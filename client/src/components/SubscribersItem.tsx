import React, { FC } from 'react';
import '../styles/SubscribersItem.css';
import DefaultAvatar from '../images/default-avatar.svg'
import { IUser } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface SubscribersItemProps{
    sub: IUser
}

const SubscribersItem:FC<SubscribersItemProps> = ({sub}) => {

    const navigate = useNavigate();

    let validString = sub.nickname.substring(0, 9);

    const lengthString = sub.nickname.length;

    if (lengthString > 9){
        validString = `${validString}...`;
    }

    const pathUser = 'http://localhost:4000/users/' + sub.avatar;


    const linkPath = `/user/${sub.nickname.toLowerCase()}`;

    const navigateToUserInfo = () =>{
        navigate(linkPath);
    }

    return (
        <div onClick={navigateToUserInfo} className="sub-item">
            <div className="sub-item__avatar">
                <img src={sub.avatar ? pathUser : DefaultAvatar} alt="" />
            </div>
            <div className="sub-item__nickname">{validString}</div>
        </div>
    );
};

export default SubscribersItem;