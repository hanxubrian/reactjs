import axios from 'axios';
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


class menuService {
    loadAccountMenu =  (url,userId) => {
        const urlObj = {
            "localhost": 2,
            "itdept.local": 8,
            "franport.local": 5
        }
        switch(url) {
            case "localhost":
                return new Promise((resolve, reject) => {
                    axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/menuoption?appId=${urlObj["localhost"]}&userId=${userId}`)
                        .then( res => {
                            if(res.status===200) {
                                resolve(res.data);
                            }
                            else if(res.status!==200){
                                reject(res.data);
                            }
                        })
                });
            case "itdept.local":
                return new Promise((resolve, reject) => {
                    axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/menuoption?appid=${urlObj["itdept.local"]}&userId=${userId}`)
                        .then( res => {
                            if(res.status===200) {
                                resolve(res.data);
                            }
                            else if(res.status!==200){
                                reject(res.data);
                            }
                        })
                });
            case "franport.local":
              return new Promise((resolve, reject) => {
                  axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/menuoption?appid=${urlObj["franport.local"]}&userId=${userId}`)
                      .then( res => {
                          if(res.status===200) {
                              resolve(res.data);
                          }
                          else if(res.status!==200){
                              reject(res.data);
                          }
                      })
              });
			default:
				return new Promise((resolve, reject) => {
					axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/menuoption?appid=2&userId=${userId}`)
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

    getUserMenuOptions = (appId, userId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/apps/menuoption?appId=${appId}&userId=${userId}`
            )
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
    }
}

const instance = new menuService();
export default instance;
