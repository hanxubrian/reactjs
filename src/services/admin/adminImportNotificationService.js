import axios from 'axios';


const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


class adminImportNotificationService {

    getImportResultFromRegion = (UserId,RegionId) => {
        const Data = {
            'overWrite'     : true,
            'regionIds'     : [RegionId],
            'userId'        : UserId,
        };
        return new Promise((resolve, reject) => {

            axios_instance.post(`/v1/apps/importdata`,Data)
                .then( res => {
                    if(res.status===200) {
                        resolve(res.data);
                    }
                    else if(res.status!==200){
                        reject(res);
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    }
}

const instance = new adminImportNotificationService();
export default instance;
