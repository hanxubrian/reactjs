import axios from 'axios';
import Pusher from "pusher-js";

const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});

const BASE_API_URL = 'https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

// var adminchannel = new Pusher({
//     appId: '698880',
//     key: 'ecf6a4e23b186efa2d44',
//     secret: '44ce060e1413c8aa227a',
//     cluster: 'us2',
//     encrypted: true
// });
class NotificationService {

    getallsystemnotification=( UserId)=>{
        const data ={
            'UserId'                   : UserId,
        }
        return new Promise((resolve, reject) => {
            axios_instance.post(`/v1/api/notification`,data)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res);
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    }
    adminversionupgradetrigger=(data)=>{

        // let res = adminchannel.trigger('jk-admin-channel', 'on-version', data);
        return({IsSuccess:true,data:"res"});


    }
}

const instance = new NotificationService();
export default instance;