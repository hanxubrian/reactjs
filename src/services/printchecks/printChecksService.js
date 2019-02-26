import axios from 'axios';
const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});

const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

class printChecksService {

    /**
     *
     * @param regionId
     * @param ChecktypeId
     * @param EntityTypeId
     * @param Month
     * @param Year
     * @param PaymentDate
     * @param CheckDate
     * @returns {Promise<any>}
     */
    getCheckByType = (regionId, ChecktypeId, EntityTypeId, Month, Year, PaymentDate, CheckDate) => {
        const data = {
            regionId, ChecktypeId, EntityTypeId, Month, Year, PaymentDate, CheckDate
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Check/GetCheckByType`, data)
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
    getCheckTypes= () => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/GetCheckTypes`)
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

const instance = new printChecksService();
export default instance;
