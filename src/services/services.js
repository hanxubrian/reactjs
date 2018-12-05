import axios from 'axios';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


const BASE_API_URL='http://fmsapi.ecom.bid';

class authService {
    authSignin =  (email, password) => {
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
        if(authResult.IsSuccess){
            let expiresAt = JSON.stringify((30*24*3600 * 1000) + new Date().getTime());
            localStorage.setItem('jk_ApiKey', authResult.Data.ApiKey);
            localStorage.setItem('jk_DefaultRegionId', authResult.Data.DefaultRegionId);
            localStorage.setItem('jk_Token', authResult.Data.Token);
            localStorage.setItem('jk_user_id', authResult.Data.id);
            localStorage.setItem('jk_expires_at', expiresAt);
            localStorage.setItem('jk_regions', JSON.stringify(authResult.Data.Regions));
        }
    };

    logout() {
        localStorage.removeItem('jk_ApiKey');
        localStorage.removeItem('jk_DefaultRegionId');
        localStorage.removeItem('jk_Token');
        localStorage.removeItem('jk_user_id');
        localStorage.removeItem('jk_regions');
        localStorage.removeItem('jk_expires_at');
    };

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('jk_expires_at'));
        const isNotExpired = new Date().getTime() < expiresAt;

        if ( isNotExpired )
        {
            return true;
        }
        else
        {
            this.logout();
            return false;
        }
    };
}

const instance = new authService();
export default instance;
