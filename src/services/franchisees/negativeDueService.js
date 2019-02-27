/**
 * Negative Due Service
 */

import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_MONGO_API_URL='https://apifmsplusplus_mongo.jkdev.com';

class NegativeDueService {
    /**
     * @method POST
     *
     * @param RegionId
     * @param StatusId
     * @param SearchText
     * @returns {Promise<any>}
     */
    getNegativeDueList =  (RegionId ,StatusId, SearchText) => {
        const data = {
            "RegionId": RegionId,
            "StatusId": StatusId,
            "SearchText": SearchText,
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/NegativeDue/NegativeDueList`, data)
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
    };
}

const instance = new NegativeDueService();
export default instance;
