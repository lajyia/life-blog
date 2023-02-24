import React, { FC, useState } from 'react';
import '../styles/ProfileBody.css';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../images/default-avatar.svg'
import FollowButton from './UI/FollowButton/FollowButton';

interface ProfileBody {
    avatar: string | undefined,
    nickname: string| undefined,
    me?: boolean| undefined,
    bio: string| undefined,
    linkName: string| undefined,
}


const ProfileBody: FC<ProfileBody> = ({ avatar, nickname, me, bio, linkName}) => {

    const [follow, setFollow] = useState<boolean>();
    
    const rootAvatarImageClasses = ['profile__image-avatar'];

    if (!avatar) {
        rootAvatarImageClasses.push('default');
    }

    const pathUser = 'http://localhost:4000/users/' + avatar;

    return (
        <div className="profile__body">
            <div className="profile__linkname">@{linkName}</div>
            <div className="profile__cover">
            </div>
            <div className="profile__user-info">
                <div className="profile__head-block-user-info">
                    <div className="profile__avatar">
                        <img className={rootAvatarImageClasses.join(' ')} src={avatar ? pathUser : DefaultAvatar} alt="" />
                    </div>
                    <div className="profile__blank-avatar"></div>
                    <div className="profile__head-info">
                        <div className="profile__fio">
                            <div className="profile__nickname">
                                <span>{nickname}</span>
                            </div>
                        </div>
                        <div className="profile__bio">
                            <span>{bio}</span>
                        </div>
                    </div>
                </div>
                <div className="profile__settings-block">
                    {typeof me == 'boolean'
                        ? <div>
                            {me
                                ? <Link className="profile__button-settings" to="/">Edit profile</Link>
                                : <FollowButton isFollow={true}/>
                            }
                        </div>
                        : <Link className="profile__button-settings" to="/">Edit profile</Link>
                    }
                </div>
            </div>

        </div>
    );
};

export default ProfileBody;