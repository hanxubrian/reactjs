import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


class BillrunService {

    /**
     *
     * @param RegionId
     * @param Year
     * @param Month
     * @param User
     * @param UserId
     * @param Message
     * @param Description
     * @returns {Promise<any>}
     */
    createBillrun=( RegionId, Year ,Month, User, UserId, Message, Description)=>{
        const data ={
            'RegionId'                      : RegionId,
            'Year'                          : Year,
            'Month'                         : Month,
            'CreatedBy'                     : User,
            'CreatedById'                   : UserId,
            'Message'                       : Message,
            'InvoiceDescription'            : Description,
        };

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
    };

    getAllBillrun=( RegionIds, UserIds, FromDate, ToDate, isBillPeriod, BillMonth, BillYear, SearchText)=>{
        const data ={
            RegionIds, UserIds, isBillPeriod, BillMonth, BillYear, FromDate, ToDate, SearchText
        };
        console.log('bill-run data = ', JSON.stringify(data));

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
    };

    deleteBillrun=( RegionId, billrunNo)=>{
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/billrun/delete/`+billrunNo+`?regionId=`+RegionId)
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
    };

    getInvoiceFromBillrun=( RegionId,BillRunNo)=>{
        const data ={
            'RegionId'                              :RegionId,
            'BillRunNo'                             :BillRunNo,
        };

        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/GetBillRunByNumber`,data)
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
