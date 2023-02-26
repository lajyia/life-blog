import React, { FC } from 'react';
import { IUser } from '../types/types';
import SubscribersItem from './SubscribersItem';
import '../styles/SubscribersList.css';



interface SubscribersListProps {
    subs : IUser[];
}


const SubscribersList:FC<SubscribersListProps> = ({subs}) => {
    return (
        <div className="subs-list">
            {subs.map(sub =>
                <SubscribersItem key={sub._id} sub={sub}/>
            )}
        </div>
    );
};

export default SubscribersList;