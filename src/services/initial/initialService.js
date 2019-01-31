import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus_c.jkdev.com';
// const API_KEY= 2


class initialService {
    loadHomeScreen =  (url) => {
        const urlObj = {
            "localhost": 2,
            "itdept.local": 8,
            "franport.local": 5,
            // "fmsplusplus.jkdev.com": 2,
            // "itdept.jkdev.com": 8,
            // "franport.jkdev.com": 5,
        }
            switch(url) {
                case "localhost":
                case "fmsplusplus.jkdev.com":
                    return new Promise((resolve, reject) => {
                        axios_instance.get(`${BASE_API_URL}/v1/apps/get?appid=${urlObj["localhost"]}&env=local&device=web`)
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
                        axios_instance.get(`${BASE_API_URL}/v1/apps/get?appid=${urlObj["itdept.local"]}&env=local&device=web`)
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
                    axios_instance.get(`${BASE_API_URL}/v1/apps/get?appid=${urlObj["franport.local"]}&env=local&device=web`)
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
                    return "none"
            }

    };
}

const initialServiceInstance = new initialService();
export default initialServiceInstance;
