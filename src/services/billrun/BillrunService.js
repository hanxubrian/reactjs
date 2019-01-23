import axios from 'axios';
import moment from 'moment'
const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL='https://apifmsplusplus_mongo.jkdev.com';

class BillrunService {

    /**
     * Create BIll Run
     * @param RegionId
     * @param BillRunDate
     * @param UserId
     */
    createbillrun=( RegionId, BillRunDate, UserId,Message)=>{
        const data ={
            'RegionId'      :RegionId,
            'BillRunDate'   :BillRunDate,
            'UserId'        :UserId,
            'Message'       :Message,
        }
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/billrun/create`,data)
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

const instance = new BillrunService();
export default instance;
