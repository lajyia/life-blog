import { useFetching } from './useFetching';
import { UserService } from '../API/UserService';

export const useSubscribers = (id: string) =>{

    const [fetchSubs, subsLoading, subsError] = useFetching(async () => {
        const response = await UserService.getSubscribersUser(id);
        console.log(response);
    })


}