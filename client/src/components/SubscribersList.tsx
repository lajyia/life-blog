import React, { FC } from 'react';
import { IUser } from '../types/types';
import SubscribersItem from './SubscribersItem';
import '../styles/SubscribersList.css';

interface TestUser {
    nickname: string
}


interface SubscribersListProps {
    subs : TestUser[];
}


const SubscribersList:FC<SubscribersListProps> = ({subs}) => {
    return (
        <div className="subs-list">
            {subs.map(sub =>
                <SubscribersItem key={sub.nickname} sub={sub}/>
            )}
        </div>
    );
};

export default SubscribersList;