import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


const BASE_API_URL='http://api.fmsplus.jkdev.com';
// const BASE_API_URL='http://localhost:11939';

class menuService {
    loadAccountMenu =  () => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/api/menu`)
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

const instance = new menuService();
export default instance;
