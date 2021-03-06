/**
 * Franchisee Service
 */

import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';


class franchiseesService {
    /**
     * @method POST
     *
     * @param RegionId
     * @param StatusId
     * @param Location
     * @param Latitude
     * @param Longitude
     * @param SearchText
     * @returns {Promise<any>}
     */
    getFranchiseesList =  (RegionId ,StatusId, Location, Latitude, Longitude, SearchText) => {
        const data = {
            "RegionId": RegionId,
            "StatusId": [StatusId],
            "Location": Location,
            "Latitude": Latitude,
            "Longitude": Longitude,
            "SearchText": SearchText,
            "Radius":0
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/franchisee/franchiseeList`, data)
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
     * @method GET
     *
     * @param RegionId
     * @returns {Promise<any>}
     */
    getStatusFilterList = (RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/lists/getfranchiseestatuslist?RegionId=${RegionId}`)
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
     * @method GET
     *
     * @param RegionId
     * @returns {Promise<any>}
     */
    getFranchiseeFormPlanType = (RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/GetFranchiseePlanList?RegionId=${RegionId}`)
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
     * @method GET
     *
     * @param RegionId
     * @returns {Promise<any>}
     */
    getFranchiseeDocumentsList = (RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/GetFranchiseeDocuments`)
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
     * @method GET
     *
     * @param RegionId
     * @returns {Promise<any>}
     */
    getFranchiseeFeeMaintenance = (RegionId) => {
        return new Promise((resolve, reject) => {
            // axios_instance.get(`${BASE_MONGO_API_URL}/v1/regions/fees/get/?RegionId=${RegionId}`)
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/GetFeeStructure/?RegionId=${RegionId}`)
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
     * @method GET
     * @returns {Promise<any>}
     */
    getFranchiseeStateList = () => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/lists/states`)
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
     * @method POST
     *
     * @param  regionId
     * @param data
     *
     * @returns {Promise<any>}
     *
    */
    createFranchiseesList =  (regionId,data) => {

        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Franchisee/create/${regionId}`, data)
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
     * @method POST
     *
     * @param  regionId
     * @param id
     * @param data
     *
     * @returns {Promise<any>}
     *
    */

    updateFranchiseesList =  (id,regionId,data) => {

    return new Promise((resolve, reject) => {
        axios_instance.post(`${BASE_MONGO_API_URL}/v1/Franchisee/update/${id}?regionId=${regionId}`, data)
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
     * @method GET
     *
     * @param  regionId
     * @param id
     *
     * @returns {Promise<any>}
     *
    */

   getFranchiseesDetail =  (id,regionId) => {

    return new Promise((resolve, reject) => {
        axios_instance.get(`${BASE_MONGO_API_URL}/v1/Franchisee/${id}?regionId=${regionId}`)
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
     * @method POST
     *
     * @param  regionId
     * @param id
     *
     * @returns {Promise<any>}
     *
    */

   deleteFranchiseesList =  (id,regionId) => {

    return new Promise((resolve, reject) => {
        axios_instance.post(`${BASE_MONGO_API_URL}/v1/Franchisee/delete/${id}?regionId=${regionId}`)
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
     * @method GET
     *
     * @param  RegionId
     * @param FranchiseeNo
     *
     * @returns {Promise<any>}
     *
    */

   getFinderfeesByFranchiseeNo =  (RegionId,FranchiseeNo) => {

    return new Promise((resolve, reject) => {
        axios_instance.get(`${BASE_MONGO_API_URL}/v1/FinderFee/finderfeesByFranchiseeNo?RegionId=${RegionId}&FranchiseeNo=${FranchiseeNo}`)
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
     * @method GET
     *
     * @param regionId
     * @param year
     * @param month
     * @returns {Promise<any>}
     */
    getFranchiseesReportsList = (regionId, year, month) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/api/franchisee/GetFranchisees`,
                { params: {regionId, year, month}}
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

    getFranchiseeReportByFranchiseeNum = (RegionId,FranchiseeNo) => {
        console.log('qqqq=',RegionId,FranchiseeNo)
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/FranchiseReport/GetListByFranchisee?regionId=${RegionId}&franchiseeNo=${FranchiseeNo}`)
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

    getFranchiseeReport = (params) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/api/FranchiseeReport`,
                { params: {...params}}
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

    createFranchiseeReport = (params) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/api/CreateFranchiseeReport`,
                { params: {...params}}
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

    /**
     * get Transaction Lists
     *
     * @method POST
     * @returns {Promise<any>}
     * @param regionId
     */
    getFranchiseesTransactionList =  (regionId ) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/franchiseetransactions/list?regionId=${regionId}`)
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
     * create new franchisee transaction.
     * @param regionId
     * @param data
     * @returns {Promise<any>}
     */
    createFranchiseeTransaction =  (regionId, data ) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/franchiseetransaction/create/${regionId}`, data)
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
     * gets a transaction detail from _id.
     * @param transactionId
     * @param regionId
     * @returns {Promise<any>}
     */
    getTransactionDetail = (transactionId, regionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/franchiseetransaction/${transactionId}`,{
                params: {regionId: regionId}})
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
     * remove a transaction with Id & regionId
     * @param regionId
     * @param id
     * @returns {Promise<any>}
     */
    removeFranchiseeTransaction = (regionId, id) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/franchiseetransaction/delete/${id}?regionId=${regionId}`)
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
     * update a franchisee transaction with id and regionId
     * @param id
     * @param regionId
     * @param data: payload
     * @returns {Promise<any>}
     */
    updateFranchiseeTransaction = (id, regionId, data) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/franchiseetransaction/update/${id}?regionId=${regionId}`, data)
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
     * get Franchisee Transaction type lists
     * @param regiondId
     * @returns {Promise<any>}
     */
    getFranchiseeTransactionTypeLists = (regiondId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/api/Lists/GetFranchiseeTransactionType`,{
                params: {regionId: regiondId}})
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

    getFranchiseeTransactionTaxAmount = (regionId, FranchiseeId, Amount, Quantity, TaxTypeId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/api/Tax/GetFranchiseeTaxAmount`,{
                params: {regionId, FranchiseeId, Amount, Quantity, TaxTypeId}})
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

const instance = new franchiseesService();
export default instance;
