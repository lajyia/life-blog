import axios from 'axios';
import { IPost } from '../types/types';

export class PostService{
    static async getPost(){
        const response = await axios.post<IPost[]>('http://localhost:4000/api/feed');
        return response
    }
    static async getAvatar(nickname: string){
        const response = await axios.get(`http://localhost:4000/api/profile/avatar?nickname=${nickname}`)
        return response
    }
}