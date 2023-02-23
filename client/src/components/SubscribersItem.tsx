import React, { FC } from 'react';
import '../styles/SubscribersItem.css';
import DefaultAvatar from '../images/test-image.jpg';

interface TestUser {
    nickname: string
}

interface SubscribersItemProps{
    sub: TestUser
}

const SubscribersItem:FC<SubscribersItemProps> = ({sub}) => {

    let validString = sub.nickname.substring(0, 8);

    const lengthString = sub.nickname.length;

    if (lengthString > 8){
        validString = `${validString}...`;
    }


    return (
        <div className="sub-item">
            <div className="sub-item__avatar">
                <img src={DefaultAvatar} alt="" />
            </div>
            <div className="sub-item__nickname">{validString}</div>
        </div>
    );
};

export default SubscribersItem;