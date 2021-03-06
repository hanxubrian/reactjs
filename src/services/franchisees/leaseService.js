import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';

class leaseService {
    /**
     * @param RegionId
     * @param StatusId
     * @param SearchText
     * @returns {Promise<any>}
     */
    getLeaseList =  (RegionId, StatusId, SearchText) => {
        // const data = {
        //     "RegionId": [24],
        //     "TransactionStatusId": [21, 24],
        //     "SearchText": ''
        // };
        const data = {
            "RegionId": RegionId,
            "TransactionStatusId": StatusId,
            "SearchText": SearchText
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Lease/LeaseList`, data)
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
            axios_instance.get(`${BASE_API_URL}/v1/lists/getleasestatuslist?RegionId=${RegionId}`)
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

    getLeaseStatusList = (RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/lists/GetLeaseStatusList`,
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

    getLeaseDetailList = (id, regionId) => {
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_MONGO_API_URL}/v1/Lease/${id}`, {
                 params: {regionId: regionId }
                })
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
    createNewLease = (data) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Lease/Create`,data)
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

    deleteLease = (regionId, id) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Lease/Create/${id}?regionId=${regionId}`)
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
     * @method POST
     * @param id
     * @param regionId
     * @param data
     * @returns {Promise<any>}
     */
    updateLease = (regionId, id, data) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Lease/update`, data)
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

const instance = new leaseService();
export default instance;
