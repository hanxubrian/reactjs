import axios from 'axios';
import moment from 'moment'
const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});

const BASE_API_URL = 'https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

class territoriesService {
    /**
     * @method GET
     *
     * @param RegionId
     * @returns {Promise<any>}https://apifmsplusplus_mongo.jkdev.com/v1/accountsreceivable/Invoice/5c509947a0cca6256c9f22be?regionId=2
     */
    getInvoiceListForPayments = (RegionId,InvoiceId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/accountsreceivable/Invoice/${InvoiceId}?RegionId=${RegionId}`)
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

const instance = new territoriesService();
export default instance;