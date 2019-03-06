import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';

class findersFeesService {
    /**
     * @param year
     * @param month
     * @returns {Promise<any>}
     */
    // getFindersFeeList =  (year, month) => {
    //     return new Promise((resolve, reject) => {
    //         axios_instance.get(`${BASE_MONGO_API_URL}/api/Franchisee/leafil?year=${year}&month=${month}`)
    //             .then( res => {
    //                 if(res.status===200) {
    //                     resolve(res.data);
    //                 }
    //                 else if(res.status!==200){
    //                     reject(res.data);
    //                 }
    //             })
    //             .catch(error=>{
    //                 resolve(error);
    //             })
    //     });
    // };

    /**
     * @param RegionId
     * @param StatusId
     * @param SearchText
     * @returns {Promise<any>}
     */
    getFindersFeeList =  (RegionId, StatusId,SearchText) => {
        const data = {
            RegionId: RegionId ,
            StatusId: StatusId ,
            SearchText: SearchText
        }
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/FinderFee/FinderFeeList`,data)
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
     * @param year
     * @returns {Promise<any>}
     */
    getStatusFilterList = (year) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/lists/getfindersFeestatuslist?year=${year}`)
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

const instance = new findersFeesService();
export default instance;
