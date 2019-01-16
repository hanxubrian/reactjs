/**
 * Franchisee Service
 */

import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL='https://apifmsplusplus_mongo.jkdev.com';

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
            axios_instance.post(`${BASE_API_URL}/v1/franchisee/franchiseeList`, data)
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
            axios_instance.get(`${BASE_API_URL}/v1/lists/GetFranchiseePlans?RegionId=${RegionId}`)
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
            axios_instance.get(`${BASE_API_URL}/v1/lists/GetFranchiseeDocumentsList?RegionId=${RegionId}`)
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
            axios_instance.get(`${BASE_API_URL}/v1/regions/fees/get/?RegionId=${RegionId}`)
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
    getFranchiseeStateList = (RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/lists/GetStateAbbreviationList?RegionId=${RegionId}`)
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
    }
    /**
     * @method POST
     *
     * @param data
     * @param regionId
     * @returns {Promise<any>}
     */
    createFranchiseesList =  (data,regionId) => {

        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_API_URL}/v1/Franchisee/create/${regionId}`, data)
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
            axios_instance.get(`${BASE_MONGO_API_URL}/api/franchisee/GetReports`,
                { params: {...params}}
            )
                .then( res => {
                    console.log('reports API result=', res);
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
