import axios from 'axios';
const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});

const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

class mailService {
    /**
     * @method POST
     *
     * @param data
     * @returns {Promise<any>}https://apifmsplusplus_mongo.jkdev.com/v1/accountsreceivable/Invoice/5c509947a0cca6256c9f22be?regionId=2
     */
    sendEmail = (Subject,ContentBody,Recipients) => {
        const data = {
            Subject: Subject,
            ContentBody: ContentBody,
            Recipients: Recipients
        }
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/Email/Send`,data)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res.data);
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    };
}

const instance = new mailService();
export default instance;