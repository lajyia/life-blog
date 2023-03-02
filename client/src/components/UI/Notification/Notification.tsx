import React, { FC } from 'react';
import classes from './Notification.module.css';
import '../../../styles/Notification.css'


interface notificationProps{
    children?: React.ReactNode,
}

const Notification: FC<notificationProps> = ({children}) => {
    return (
        <div className="notification">
            {children}
        </div>
    );
};

export default Notification;