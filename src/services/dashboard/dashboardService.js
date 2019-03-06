import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});


class DashboardService {
    getDashboardWidget = () => {
        return new Promise((resolve,reject) => {
            axios.get(`/api/analytics-dashboard-app/widgets`
                // { params: {RegionId: RegionId}}
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
}

const instance = new DashboardService();
export default instance;
