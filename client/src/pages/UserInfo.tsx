import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserService } from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import { IUser } from '../types/types';
import UserNotFound from '../components/UserNotFound';

const UserInfo: FC = () => {

    const [user, setUser] = useState<boolean | IUser>();

    const params = useParams();
    const userId = params.id;


    const [fetchUser, userLoading, userError] = useFetching(async () =>{
        const response = await UserService.getUserInfoById(userId);
        setUser(response.data.user);
    })

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
            {user
                ? <div>test profile user</div>
                : <UserNotFound/>
            }
        </div>
    );
};

export default UserInfo;