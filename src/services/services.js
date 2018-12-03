import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


const BASE_API_URL='http://fmsapi.ecom.bid';

class authService {

    authSignin =  async (email, password)=>{
        const loginData = {
            'username': email,
            'password': password
        };

        let res = await axios_instance.post(`${BASE_API_URL}/v1/authentication/login`, loginData);
        try {
            return await res.data;
        } catch(error){
            console.log('api result failure:', res);
            return await res.data;
        }
    };

    authSignin1 =  (email, password) => {
        const loginData = {
            'username': email,
            'password': password
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_API_URL}/v1/authentication/login`, loginData)
                .then( res => {
                    if(res.status===200) {
                        this.setSession(res.data);
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
        });
    };

    setSession = (authResult) => {

    }
}

const instance = new authService();
export default instance;
