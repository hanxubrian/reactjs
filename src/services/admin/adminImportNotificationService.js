import axios from 'axios';
import {USER_LOGGED_OUT} from "../../auth/store/actions";
// export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


const BASE_API_URL='https://apifmsplus_c.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

class adminImportNotificationService {

    getImportResultFromRegion = (UserId,RegionId) => {
        const Data = {
            'overWrite'     : true,
            'regionIds'     : [3],
            'userId'        : UserId,
        };
        return new Promise((resolve, reject) => {

            axios_instance.post(`/v1/apps/importdata`,Data)
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
}

const instance = new adminImportNotificationService();
export default instance;
