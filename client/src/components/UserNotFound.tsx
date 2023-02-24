import React, { FC } from 'react';
import '../styles/UserNotFound.css';
import NotFoundUser from '../images/not-found-user.svg'

const UserNotFound: FC = () => {
    return (
        <div className="user-not-found">
            <div className="user-not-found__body">
                <div className="user-not-found__image-body">
                    <img className='user-not-found__image' src={NotFoundUser} alt="" />
                </div>
                <div className="user-not-found__text-body">
                    <div className="user-not-found__title">User Not Found</div>
                    <div className="user-not-found__text">Error 404</div>
                </div>
            </div>
        </div>
    );
};

export default UserNotFound;