import React, { FC } from 'react';
import classes from './LoaderItems.module.css'
import LoaderAvatar from '../../../images/loader-avatar.svg';

const LoaderItems: FC = () => {
    return (
        <div className={classes.loader}>
            <img src={LoaderAvatar} alt="" />
        </div>
    );
};

export default LoaderItems;