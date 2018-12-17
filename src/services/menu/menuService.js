import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


// const BASE_API_URL='http://api.fmsplus.jkdev.com';
const userId = localStorage.getItem('jk_user_id');
console.log('userId',userId);
const BASE_API_URL='https://apifmsplus.jkdev.com';

class menuService {
    loadAccountMenu =  () => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/menu/get/?appid=2&userid=${userId}`)
                .then( res => {
                    if(res.status===200) {
                        console.log(res.data);
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
