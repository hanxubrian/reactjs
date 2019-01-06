import axios from 'axios';
// export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';

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
        });
    };
}

const instance = new franchiseesService();
export default instance;
