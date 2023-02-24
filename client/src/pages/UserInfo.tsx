import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserService } from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import { IUser } from '../types/types';
import UserNotFound from '../components/UserNotFound';

const UserInfo: FC = () => {

    const [user, setUser] = useState<boolean | IUser>();
    const [isMe, setIsMe] = useState<boolean | string>();

    const params = useParams();
    const userId = params.id;


    const [fetchUser, userLoading, userError] = useFetching(async () =>{
        const response = await UserService.getUserInfoById(userId);
        console.log(response.data)
        setUser(response.data.user);
        checkUser();
    })

    const checkUser = async () =>{
        const response = await UserService.isMe(userId);
        setIsMe(response.data.message);
    }

    useEffect(() =>{
        fetchUser();
    }, [])


    if (userLoading){
        return(
            <Loader/>
        )
    }

    return (
        <div>
            {!user
                ? <UserNotFound/>
                : <div>test profile user</div>
            }
        </div>
    );
};

export default UserInfo;