import axios from 'axios';
import moment from 'moment'
const axios_instance = axios.create({
	headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	withCredentials: false
});

const BASE_API_URL = 'https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

class PaymentListService {
    /**
     * gets invoice lists
     * @param RegionId
     * @param FromDate
     * @param ToDate
     * @param SearchText
     * @returns {Promise<any>}
     */
	getAccountReceivablePaymentsList = (RegionId, FromDate, ToDate, SearchText, Status) => {
		const data = {
			"RegionId": RegionId,
			"FromDate": "01/31/2017",
			"ToDate": "12/31/2019",
			"SearchText": SearchText,
			"Status": Status
		}
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/Payment/PaymentList`, data)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					} else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	}

	createAccountReceivablePayment = (RegionId, customerNumber, PaymentType, ReferenceNo, PaymentDate, PaymentNote, overpayment, PaymentAmount, PayItems, ) => {
		const data = {
			"RegionId": RegionId,
			"CustomerNo": customerNumber,
			"Payment": {
				"PaymentType": PaymentType,
				"ReferenceNo": ReferenceNo,
				"PaymentDate": PaymentDate,
				"Note": PaymentNote,
				"OverPayment": overpayment,
				"Amount": PaymentAmount,
				"AmountApplied": PaymentAmount,
				"PayItems": PayItems
			}
		}
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/payment/create`, data)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					} else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	}

	getPaymentHistory = (regionId, fromDate, toDate, status, paymentTypes = []) => {
		fromDate = "01/31/2017"
		toDate = "12/31/2019"
		return new Promise((resolve, reject) => {
			const data = {
				regionId, 
				fromDate,
				toDate,
				PaymentTypes: paymentTypes
			}
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/payment/gethistory`, data)
			// axios_instance.get(`${BASE_MONGO_API_URL}/v1/payment/gethistory?regionId=${regionId}&fromDate=${fromDate}&toDate=${toDate}`)
				.then(res => {
					console.log("getPaymentHistory service", res)
					if (res.status === 200) {
						resolve(res.data);
					} else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	}
}

const instance = new PaymentListService();
export default instance;