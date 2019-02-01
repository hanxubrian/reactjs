import axios from 'axios';



const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});
const axios_instance_admin = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false,
    mode: 'cors',
});

const BASE_API_URL = 'https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';


class NotificationService {

    getallsystemnotification=( RegionId)=>{
        const data ={
            'RegionId'                   : RegionId,
        }
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/pushnotificationlist?RegionId=`+RegionId)
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
    getpushermessagebyid=( Id)=>{
        const data ={
            'id'                      : Id,
        }
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/pushnotification?id=`+Id)
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
        return new Promise((resolve, reject) => {//,cors(),bodyParser.urlencoded({extended: false}),bodyParser.json()
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/pushnotification/upgrate`,data)
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

        // let res = adminchannel.trigger('jk-admin-channel', 'on-version', data);
        // return({IsSuccess:true,data:"res"});


    }
}

const instance = new NotificationService();
export default instance;