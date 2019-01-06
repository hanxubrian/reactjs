import axios from 'axios';
import moment from "moment"
const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';

class invoiceService {
    getInvoiceList =  (RegionId=[2] ,StatusId=[1], FromDate="01/01/2018", ToDate="", OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText) => {
        const data = {
            "RegionId": [...RegionId],
            "TransactionStatusId": [...StatusId],
            "FromDate": FromDate,
            "ToDate": ToDate,
            "OpenOrClosed": OpenOrClosed,
            "InvoiceTypeId": InvoiceTypeId,
            "ToPrintOrToEmail": ToPrintOrToEmail,
            "SearchText": SearchText
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_API_URL}/v1/accountsreceivable/InvoiceList`,data)
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

const instance = new invoiceService();
export default instance;
