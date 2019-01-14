import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const userId = localStorage.getItem('jk_user_id');
console.log('userId',userId);

const BASE_API_URL='https://apifmsplus_c.jkdev.com';

class menuService {
    loadAccountMenu =  (url) => {
        const urlObj = {
            "localhost": 2,
            "itdept.local": 8,
            "franport.local": 5
        }
        switch(url) {
            case "localhost":
                return new Promise((resolve, reject) => {
                    axios_instance.get(`${BASE_API_URL}/v1/menu/get/?appid=${urlObj["localhost"]}`)
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
                    axios_instance.get(`${BASE_API_URL}/v1/menu/get/?appid=${urlObj["itdept.local"]}`)
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
                  axios_instance.get(`${BASE_API_URL}/v1/menu/get/?appid=${urlObj["franport.local"]}`)
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
					axios_instance.get(`${BASE_API_URL}/v1/menu/get/?appid=2`)
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
