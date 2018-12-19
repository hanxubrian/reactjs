import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


const BASE_API_URL='http://localhost:11939';

class authService {
    authSignin =  (email, password) => {
        const loginData = {
            'username': email,
            'password': password
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_API_URL}/api/authentication/login`, loginData)
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


    logout() {
        localStorage.removeItem('jk_ApiKey');
        localStorage.removeItem('jk_DefaultRegionId');
        localStorage.removeItem('jk_Token');
        localStorage.removeItem('jk_user_id');
        localStorage.removeItem('jk_regions');
        localStorage.removeItem('jk_expires_at');
    };

}

const instance = new authService();
export default instance;
