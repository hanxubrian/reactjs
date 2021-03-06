import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

import {USER_LOGGED_OUT} from "../../auth/store/actions";


const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


class authService {

    authSignin =  (email, password) => {
        const loginData = {
            'username': email,
            'password': password
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/authentication/login`, loginData)
                .then( res => {
                    if(res.status===200) {
                        // this.setSession(res.data);
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    };

    microsoftAuthSignin = (url) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/authentication/getAzureUrl?hostUrl=${url}`)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    }

    microsoftLoginVerify = (code, state,hostUrl) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/authentication/azureLogin?code=${code}&state=${state}&hostUrl=${hostUrl}`)
                .then( res => {
                    console.log("rest========>",res);
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    }

    logout() {

        return (dispatch) => {
            dispatch({
                type: USER_LOGGED_OUT,
            });

        }

    };

    getRegions = (userId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/regions?userId=${userId}`)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data.Data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    }
}

const instance = new authService();
export default instance;
