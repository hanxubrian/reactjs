import axios from 'axios';
import moment from 'moment'
const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

const BASE_API_URL='https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL='https://apifmsplusplus_mongo.jkdev.com';

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
            "SearchText": SearchText,
            "Month": moment().month(),
            "Year": moment().year()
        };
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/InvoiceList`,data)
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
            axios_instance.get(`${BASE_API_URL}/v1/lists/GetInvoiceStatusList`,
                { params: {RegionId: RegionId}}
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

    getInvoiceDetailList = (InvoiceId,RegionId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_MONGO_API_URL}/v1/accountsreceivable/Invoice/`+InvoiceId,{
                params: {RegionId: RegionId}})
            //     { params: {RegionId, InvoiceTypeId}}
            // )
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

    /**
     * Gets Customer Tax Amount
     * @param RegionId
     * @param CustomerId
     * @param Amount
     * @param Quantity
     * @param TaxTypeId = 1, for now
     * @returns {Promise<any>}
     */
    getCustomerTaxAmount = (RegionId, CustomerId, Amount, Quantity, TaxTypeId) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${BASE_API_URL}/v1/regions/CustomerTaxAmount/Get`,
                { params: {RegionId, CustomerId, Amount, Quantity, TaxTypeId}}
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
    };

    /**
     * create new invoice
     * @param regionId
     * @param data
     * @returns {Promise<any>}
     */
    createNewInvoice = (regionId, data) => {
        return new Promise((resolve, reject) => {
            axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/invoice/create/${regionId}`,data)
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

    deleteInvoice = (regionId, id) => {
        return new Promise((resolve, reject) => {
            axios_instance.delete(`${BASE_MONGO_API_URL}/v1/accountsreceivable/invoice/delete/${id}?regionId=${regionId}`)
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
    }
}

const instance = new invoiceService();
export default instance;
