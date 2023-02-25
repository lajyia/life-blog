const axios = require('axios');

export class SubscribersService {
    static async getSubscribers(){

        const jwt = localStorage.getItem("jwt");

        const response = axios.get('http://localhost:4000/api/subscribers', {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        })
        return response
    }
}