import axios from 'axios';

const instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


const BASE_API_URL='http://fmsapi.ecom.bid';

export const authSignin =  async (email, password)=>{
    const loginData = {
        'username': email,
        'password': password
    };

    let res = await instance.post(`${BASE_API_URL}/v1/authentication/login`, loginData);
    try {
        return await res.data;
    } catch(error){
        console.log('api result failure:', res);
        return await res.data;
    }
};
