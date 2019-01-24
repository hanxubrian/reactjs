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
     *
     * @param RegionId
     * @param Year
     * @param Month
     * @param User
     * @param UserId
     * @param Message
     * @returns {Promise<any>}
     */
    createbillrun=( RegionId, Year ,Month,User, UserId,Message)=>{
        const data ={
            'RegionId'              :RegionId,
            'Year'                  :Year,
            'Month'                 :Month,
            'User'                  :User,
            'UserId'                :UserId,
            'Message'               :Message,
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
    getallbillrun=( RegionIds, UserIds ,isBillPeriod,BillMonth,BillYear,FromDate,ToDate,SearchText)=>{
        const data ={
            'RegionIds'                             :RegionIds,
            'UserIds'                               :UserIds,
            'isBillPeriod'                          :isBillPeriod,
            'BillMonth'                             :BillMonth,
            'BillYear'                              :BillYear,
            'FromDate'                              :FromDate,
            'ToDate'                                :ToDate,
            'SearchText'                            :SearchText,

        }
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/billrun/list`,data)
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
