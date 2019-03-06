import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});


class AgingService {
    /**
     * gets Aging Report
     * @param regionId
     * @param params, JSON Object
     * @returns {Promise<any>}
     */
    getAgingReports = (regionId, params) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/AgingReport`, params)
                .then(res => {
                    if (res.status === 200) {
                        resolve(res.data);
                    }
                    else if (res.status !== 200) {
                        reject(res.data);
                    }
                })
                .catch(error => {
                    resolve(error);
                })
        });
    };
}

const instance = new AgingService();
export default instance;
