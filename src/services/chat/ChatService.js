import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL='https://apifmsplusplus_mongo.jkdev.com';
const LOCALHOST_URL = "http://localhost:12217/";

class chatService {
    getUserListforcontacts=(data)=>{
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/account/users`,data)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                })
        });
    }
    getContactList =  (userId) => {
        
             return new Promise((resolve, reject) => {
             axios_instance.get(`${BASE_MONGO_API_URL}/api/chat/contacts?id=${userId}`)
                .then( res => {
                    console.log("contact -list",res);
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                })
        }); 
    }

    getUserData = (userId, name, avatar) =>{
        const data = {
            "id": userId,
            "name": name,
            "custom_data": { "photo":  avatar, "mood": 'good'},
        };

        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/api/chat/getuser`,data)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                    
                })
        });
    }

    openChat = (id, userId, name, avatar) => {
        const data = {
            "id": userId,
            "name": name,
            "custom_data":{ "photo":  avatar},
        };

        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/api/chat/openchat?id=${id}`, data)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                    
                })
        });
    }

    getMessages = (roomId, userId) =>{
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/api/chat/messages?roomId=${roomId}&userId=${userId}`)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                   
                })
        });
    }

}

const instance = new chatService();
export default instance;