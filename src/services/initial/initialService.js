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
            "mode": 0
        }
        if ("mode" !== 0) {
            switch(url) {
                case "localhost":
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
        } else {
            switch(url) {
                case "localhost":
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
        }
        // return new Promise((resolve, reject) => {
        //     axios_instance.get(`${BASE_API_URL}/v1/apps/get?appid=${API_KEY}&env=local&device=web`)
        //         .then( res => {
        //             if(res.status===200) {
        //                 resolve(res.data);
        //             }
        //             else if(res.status!==200){
        //                 reject(res.data);
        //             }
        //         })
        // });
    };
}

const initialServiceInstance = new initialService();
export default initialServiceInstance;
