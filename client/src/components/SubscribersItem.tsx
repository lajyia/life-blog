import React, { FC } from 'react';
import { IUser } from '../types/types';
import '../styles/SubscribersItem.css';
import DefaultAvatar from '../images/test-image.jpg';

interface TestUser {
    nickname: string
}


interface SubscribersItemProps{
    sub: TestUser
}

const SubscribersItem:FC<SubscribersItemProps> = ({sub}) => {
    return (
        <div className="sub-item">
            <div className="sub-item__avatar">
                <img src={DefaultAvatar} alt="" />
            </div>
            <div className="sub-item__nickname">{sub.nickname}</div>
        </div>
    );
};

export default SubscribersItem;