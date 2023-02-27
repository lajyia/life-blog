import React, {FC} from 'react';
import './LoaderAvatar.css';
import ImageLoader from '../../../images/loader-avatar.svg';

const LoaderAvatar:FC = () => {
    return (
        <div className="loader">
            <img src={ImageLoader} alt="" />
        </div>
    );
};

export default LoaderAvatar;