import axios from 'axios';
import {USER_LOGGED_OUT} from "../../auth/store/actions";
// export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


const BASE_API_URL='https://apifmsplus_c.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

class authService {

    authSignin =  (email, password) => {
        const loginData = {
            'username': email,
            'password': password
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_API_URL}/api/authentication/login`, loginData)
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
