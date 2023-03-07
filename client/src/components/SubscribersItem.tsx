import React, { FC, useState } from 'react';
import '../styles/SubscribersItem.css';
import DefaultAvatar from '../images/default-avatar.svg'
import { IUser } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface SubscribersItemProps {
    sub: IUser
}

const SubscribersItem: FC<SubscribersItemProps> = ({ sub }) => {

    const navigate = useNavigate();

    const [validString, setValidString] = useState('');

    let linkPath:string;

    if (sub.nickname) {

        linkPath = `/user/${sub.nickname.toLowerCase()}`;

        setValidString(sub.nickname.substring(0, 9));

        const lengthString = sub.nickname.length;

        if (lengthString > 9) {
            setValidString(`${validString}...`);
        }

    }

    const pathUser = 'http://localhost:4000/users/' + sub.avatar;


    const navigateToUserInfo = () => {
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