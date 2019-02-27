import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL='https://apifmsplusplus_mongo.jkdev.com';

class chargebackService {
    /**
     * @param regionId
     * @param month
     * @param year
     * @returns {Promise<any>}
     */
    getChargebackList =  (regionId, month, year) => {
        // const data = {
        //     "RegionId": [24],
        //     "TransactionStatusId": [21, 24],
        //     "SearchText": ''
        // };
        const data = {
            "regionId": regionId,
            "month": month,
            "year": year
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/chargeback/ChargebackList`, data)
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
     * @param RegionId
     * @returns {Promise<any>}
     */
    getStatusFilterList = (RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/lists/getchargebackstatuslist?RegionId=${RegionId}`)
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

    getChargebackStatusList = (RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/lists/GetChargebackStatusList`,
                { params: {RegionId: RegionId}}
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

    getChargebackDetailList = (ChargebackId) => {
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_MONGO_API_URL}/v1/Chargeback/ChargebackList/${ChargebackId}`)
            //     { params: {RegionId, ChargebackTypeId}}
            // )
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
     * create new invoice
     * @param regionId
     * @param data
     * @returns {Promise<any>}
     */
    createNewChargeback = (data) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Chargeback/Create`,data)
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

    deleteChargeback = (regionId, id) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Chargeback/Create/${id}?regionId=${regionId}`)
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
     * update an invoice
     * @method PUT
     * @param id
     * @param regionId
     * @param data
     * @returns {Promise<any>}
     */
    updateInvoice = (data) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Chargeback/Create`,data)
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

const instance = new chargebackService();
export default instance;
