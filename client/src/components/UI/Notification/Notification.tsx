import React, { FC } from 'react';
import classes from './Notification.module.css';

interface notificationProps{
    children?: React.ReactNode
}

const Notification: FC<notificationProps> = ({children}) => {
    return (
        <div className={classes.notification}>
            {children}
        </div>
    );
};

export default Notification;