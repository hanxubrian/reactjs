import axios from 'axios';
// export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL='https://apifmsplusplus_mongo.jkdev.com';

class franchiseesService {
    getFranchiseesList =  (RegionId ,StatusId, Location, Latitude, Longitude, SearchText) => {
        const data = {
            "RegionId": [RegionId],
            "TransactionStatusId": [StatusId],
            "Location": Location,
            "Latitude": Latitude,
            "Longitude": Longitude,
            "SearchText": SearchText
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_API_URL}/v1/franchisee/franchiseeList`,data)
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
    getFranchiseesReportsList = (regionId=2, year="2017", month="1") => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/api/franchisee/getfranchiseereports`,
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
}

const instance = new franchiseesService();
export default instance;
