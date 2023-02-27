import React, { FC } from 'react';
import '../styles/SubscribersItem.css';
import DefaultAvatar from '../images/default-avatar.svg'
import { IUser } from '../types/types';

interface SubscribersItemProps{
    sub: IUser
}

const SubscribersItem:FC<SubscribersItemProps> = ({sub}) => {

    let validString = sub.nickname.substring(0, 8);

    const lengthString = sub.nickname.length;

    if (lengthString > 8){
        validString = `${validString}...`;
    }

    const pathUser = 'http://localhost:4000/users/' + sub.avatar;


    return (
        <div className="sub-item">
            <div className="sub-item__avatar">
                <img src={sub.avatar ? pathUser : DefaultAvatar} alt="" />
            </div>
            <div className="sub-item__nickname">{validString}</div>
        </div>
    );
};

export default SubscribersItem;