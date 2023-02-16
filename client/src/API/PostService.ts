import axios from 'axios';
import { IPost } from '../types/types';

export class PostService{
    static async getPost(){
        const response = await axios.post<IPost[]>('http://localhost:4000/api/feed');
        return response
    }

    static async checkLogin(login: string){
        const response = await axios.get('http://localhost:4000/api/registration/check/login', {
            params : {
                login
            }
        })
        return response
    }

    static async checkLinkname(linkName: string){
        const response = await axios.get('http://localhost:4000/api/registration/check/linkname', {
            params: {
                linkName
            }
        })
        return response
    }
}