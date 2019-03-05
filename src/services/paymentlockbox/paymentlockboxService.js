import axios from 'axios';

const axios_instance = axios.create({
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: false
});

const BASE_API_URL = 'https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

class PaymentLockBoxService {
    getallpaymentlockbox = (RegionId) => {
        return new Promise((resolve, reject) => {
            // axios_instance.post(`${BASE_MONGO_API_URL}/v1/payment/lockbox/upload?regionId=${RegionId}`
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/payment/lockbox/upload`,
                RegionId
            )
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
    //fileupload
    fileupload = (file,region) => {
        if(file  && file !== null){
            const data = new FormData();
            data.append('file', file, file.name);
            return new Promise((resolve, reject) => {
                axios_instance
                    .post(`${BASE_MONGO_API_URL}/v1/payment/lockbox/upload?regionId=${region}`, file, {
                        onUploadProgress: ProgressEvent => {
                            // this.setState({
                            //     loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                            // })
                            // resolve(ProgressEvent.loaded / ProgressEvent.total*100);
                            resolve({uploadingnow:true,progress:ProgressEvent.loaded / ProgressEvent.total*100});
                            console.log("ProgressEvent.loaded / ProgressEvent.total*100",ProgressEvent.loaded / ProgressEvent.total*100);
                        },
                    })
                    .then(res => {
                        console.log("res.statusText",res.statusText);

                    })

                // axios_instance.post(`${BASE_MONGO_API_URL}/v1/payment/lockbox/upload`,data)
                //     .then( res => {
                //         if(res.status===200) {
                //             resolve(res.data);
                //         }
                //         else if(res.status!==200){
                //             reject(res.data);
                //         }
                //     })
                //     .catch(error=>{
                //         resolve(error);
                //     })
            });
        }

    };
}

const instance = new PaymentLockBoxService();
export default instance;