import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


class verificationService {
    /**
     * gets pending invoice & transaction lists
     * @param RegionId
     * @returns {Promise<any>}
     */
    getInvoiceTransactionPendingList =  (regionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/api/accountsreceivable/GetPendings`,
                { params: {regionId}}
            )
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

    getInvoiceTransactionPendingList1 =  (regionId, fromDate, toDate) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Verification/List`,  {regionId,fromDate, toDate})
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

    /**
     *
     * @param regionId
     * @param UserId
     * @param Action = "verify" or "reject"
     * @param ids
     * @returns {Promise<any>}
     */
    verifyBulkUpdate = (regionId, UserId, Action, ids)=> {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Verification/BulkUpdate`,  {regionId,UserId, Action, ids})
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
}

const instance = new verificationService();
export default instance;
