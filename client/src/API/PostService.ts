import axios from 'axios';

export class PostService {
    static async getPosts(jwt: string | null) {

        const response = await axios.get('http://localhost:4000/api/feed', {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        });

        return response
    }
    static async getAvatar(nickname: string) {
        const response = await axios.get(`http://localhost:4000/api/profile/avatar?nickname=${nickname}`)
        return response
    }

    static async getAuthorPosts(){

        const jwt = localStorage.getItem("jwt");

        const response = await axios.get(`http://localhost:4000/api/feed/author`, {
            headers:{
                authorization : "Bearer " + jwt
            }
        }, );
        return response
    }
}