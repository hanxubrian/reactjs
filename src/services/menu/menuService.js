import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const userId = localStorage.getItem('jk_user_id');
console.log('userId',userId);

const BASE_API_URL='https://apifmsplus_c.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

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
              break
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
              break
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
            break
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
				return "none"
        }
    };
}

const instance = new menuService();
export default instance;
