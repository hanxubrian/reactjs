import axios from 'axios';
const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';

class invoiceService {
    /**
     * gets invoice lists
     * @param RegionId
     * @param StatusId
     * @param FromDate
     * @param ToDate
     * @param PeriodId
     * @param OpenOrClosed
     * @param InvoiceTypeId
     * @param ToPrintOrToEmail
     * @param SearchText
     * @returns {Promise<any>}
     */
    getInvoiceList =  (RegionId ,StatusId, FromDate, ToDate, PeriodId, OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText) => {
        const data = {
            "RegionId": RegionId,
            "TransactionStatusId": StatusId,
            "FromDate": FromDate,
            "ToDate": ToDate,
            "PeriodId": PeriodId,
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

    getInvoiceStatusList = (RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/lists/GetTransactionStatusList`,
                { params: {RegionId: RegionId}}
            )
                .then( res => {
                    console.log('status API result=', res);
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
    }

}

const instance = new invoiceService();
export default instance;
