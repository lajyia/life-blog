import axios from 'axios';
import { checkInterval } from '../utils/checkInterval';

export class UserService {
    
    static async login(nickname: string, password: string) {
        const response = await axios.post(`http://localhost:4000/api/profile/login?nickname=${nickname}&password=${password}`)
        return response
    }
    static async checkLinkname(linkName: string) {
        const response = await axios.get('http://localhost:4000/api/registration/check/linkname', {
            params: {
                linkName
            }
        })
        return response
    }
    static async checkLogin(login: string) {
        const response = await axios.get('http://localhost:4000/api/registration/check/login', {
            params: {
                login
            }
        })
        return response
    }
    static async registration(login: string, linkname: string, password: string) {
        const response = await axios.post(`http://localhost:4000/api/registration?password=${password}&nickname=${login}&linkName=${linkname}`)
        return response
    }
    static async getProfileByJWT() {

        const jwt = localStorage.getItem('jwt');

        const response = await axios.get(`http://localhost:4000/api/profile`, {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        });


        return response.data
    }

    static async likePost(idPost: string) {

        const resultInterval = checkInterval();

        if (resultInterval) {
            const jwt = localStorage.getItem('jwt');

            const response = await axios.post(`http://localhost:4000/api/feed/like?idPost=${idPost}`, {},
                {
                    headers: {
                        authorization: 'Bearer ' + jwt
                    }
                });

            return response
        }
    }

    static async unlikePost(idPost: string) {

        const resultInterval = checkInterval();

        if (resultInterval) {
            const jwt = localStorage.getItem("jwt");
            const response = await axios.post(`http://localhost:4000/api/feed/unlike?idPost=${idPost}`, {},
                {
                    headers: {
                        authorization: 'Bearer ' + jwt
                    }
                });

            return response
        }
    }

    static async getUserInfoById(id: string |undefined){
        const jwt = localStorage.getItem("jwt");
        const response = await axios.get(`http://localhost:4000/api/feed/user?id=${id}`, {
            headers: {
                authorization: "Bearer " + jwt
            }
        })
        return response
    }

    static async isMe(id : string | undefined){

        const jwt = localStorage.getItem("jwt");

        const response = await axios.get(`http://localhost:4000/api/profile/checkme?id=${id}`, {
            headers: {
                authorization: "Bearer " + jwt
            }
        })

        return response
    }
}