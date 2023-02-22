import React, {FC} from 'react';
import classes from './LoaderAvatar.module.css';
import ImageLoader from '../../../images/loader-avatar.svg';

const LoaderAvatar:FC = () => {
    return (
        <div className={classes.loader}>
            <img src={ImageLoader} alt="" />
        </div>
    );
};

export default LoaderAvatar;