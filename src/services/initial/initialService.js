import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus_c.jkdev.com';
const BASE_MONGO_API_URL='https://apifmsplusplus_mongo.jkdev.com';


class initialService {
    loadHomeScreen =  (url) => {
        const urlObj = {
            "localhost": 2,
            "itdept.local": 8,
            "franport.local": 5,
            "2": "5c4dee07651a9c5970514a70",
            "5": "5c4debe6651a9c5970514a6e",
            "8": "5c4ded8c651a9c5970514a6f"
        }
            switch(url) {
                case "localhost":
                case "fmsplusplus.jkdev.com":
                    return new Promise((resolve, reject) => {
                        // axios_instance.get(`${BASE_API_URL}/v1/apps/get?appid=${urlObj["localhost"]}&env=local&device=web`)
                        axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/${urlObj["2"]}`)
                            .then( res => {
                                if(res.status===200) {
                                    resolve(res.data);
                                }
                                else if(res.status!==200){
                                    reject(res.data);
                                }
                            })
                    });
                break
                case "itdept.local":
                case "itdept.jkdev.com":
                    return new Promise((resolve, reject) => {
                        // axios_instance.get(`${BASE_API_URL}/v1/apps/get?appid=${urlObj["itdept.local"]}&env=local&device=web`)
                        axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/${urlObj["5"]}`)
                            .then( res => {
                                if(res.status===200) {
                                    resolve(res.data);
                                }
                                else if(res.status!==200){
                                    reject(res.data);
                                }
                            })
                    });
                break
                case "franport.local":
                case "franport.jkdev.com":
                return new Promise((resolve, reject) => {
                    // axios_instance.get(`${BASE_API_URL}/v1/apps/get?appid=${urlObj["franport.local"]}&env=local&device=web`)
                    axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/${urlObj["8"]}`)
                        .then( res => {
                            if(res.status===200) {
                                resolve(res.data);
                            }
                            else if(res.status!==200){
                                reject(res.data);
                            }
                        })
                });
                break
                default:
                    return new Promise((resolve, reject) => {
                        axios_instance.get(`${BASE_API_URL}/v1/apps/get?appid=2&env=local&device=web`)
                            .then(res => {
                                if (res.status === 200) {
                                    resolve(res.data);
                                }
                                else if (res.status !== 200) {
                                    reject(res.data);
                                }
                            })
                    });
            }

    };
}

const initialServiceInstance = new initialService();
export default initialServiceInstance;
