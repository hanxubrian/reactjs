import axios from 'axios';
import moment from 'moment'
import {BASE_MONGO_API_URL} from './../../services'

const axios_instance = axios.create({
	headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	withCredentials: false
});


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
	getInvoiceList = (RegionId, StatusId, FromDate, ToDate, PeriodId, OpenOrClosed, InvoiceTypeId, ToPrintOrToEmail, SearchText) => {
		// const data = {
		// 	"RegionId": RegionId,
		// 	"TransactionStatusId": StatusId,
		// 	"FromDate": FromDate,
		// 	"ToDate": ToDate,
		// 	"PeriodId": PeriodId,
		// 	"OpenOrClosed": OpenOrClosed,
		// 	"ToPrint":true,
		//    	"ToEbill":false,
		// 	"InvoiceTypeId": InvoiceTypeId,
		// 	"ToPrintOrToEmail": ToPrintOrToEmail,
		// 	"SearchText": SearchText,
		// 	"Month": moment().month(),
		// 	"Year": moment().year()
		// };

		const data = {
			"RegionId":[2], 
			"FromDate":"01/01/2019", 
			"ToDate":"01/31/2019", 
			"Month":1 ,
			"Year":2019, 
			"InvoiceTypeId":["I"], 
			"ToPrint":true, 
			"ToEbill":false, 
			"DateSearchBy":"period", 
			"SearchText":""
		}

		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/InvoiceList`, data)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};

	getInvoiceStatusList = () => {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}//v1/Lists/GetInvoiceTypes`)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};

	getInvoiceDetailList = (id, regionId) => {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/accountsreceivable/invoice/${id}`, {
				params: { regionId: regionId }
			})
				.then(res => {

					if (res.status === 200) {
						resolve({ data: res.data, success: true });
					}
					else if (res.status !== 200) {
						reject({ data: res.data, success: false });
					}
				})
				.catch(error => {
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
     * @param Markup
     * @param Commission
     * @returns {Promise<any>}
     */
	getCustomerTaxAmount = (RegionId, CustomerId, Amount, Quantity, Markup, Commission, TaxTypeId) => {
		console.log('params=', CustomerId, Amount, Quantity, Markup, Commission)
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/api/Tax/GetCustomerTaxAmount`,
				{ params: { RegionId, CustomerId, Amount, Quantity, Markup, TaxTypeId, Commission } }
			)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
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
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/invoice/create/${regionId}`, data)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};

	deleteInvoice = (regionId, id) => {
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/invoice/delete/${id}?regionId=${regionId}`)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};

    /**
     * get customer suggest list
     * @param regionId
     * @param statusId
     * @param location
     * @param latitude
     * @param longitude
     * @param searchText
     * @returns {Promise<any>}
     */
	getSuggestCustomersList = (regionId, statusId, location, latitude, longitude, searchText) => {
		const data = {
			"RegionId": regionId,
			"StatusId": statusId,
			"Location": location,
			"Latitude": latitude,
			"Longitude": longitude,
			"SearchText": searchText
		};
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/Customer/SuggestCustomer`, data)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};

    /**
     * get Billing lists for Invoice line
     * @method GET
     * @param RegionId
     * @returns {Promise<any>}
     */
	getBillingLists = (RegionId) => {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/api/Lists/GetBillingType`,
				{
					params: { RegionId }
				})
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};

    /**
     * get Service Lists
     * @param RegionId
     * @param BillingTypeId
     * @returns {Promise<any>}
     */
	getServiceLists = (RegionId, BillingTypeId) => {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/api/Lists/GetServiceType`,
				{
					params: { RegionId, BillingTypeId }
				})
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};

    /**
     * update an invoice
     * @method PUT
     * @param id
     * @param regionId
     * @param data
     * @returns {Promise<any>}
     */
	updateInvoice = (id, regionId, data) => {
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/accountsreceivable/invoice/update/${id}?regionId=${regionId}`, data)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};
	// fetch(`https://apifmsplusplus_mongo.jkdev.com/v1/vendors/getvendorlist?regionId=${this.props.regionId}`)
	// +                .then(response => response.json())
	// +                .then(data => this.setState({ vendorList: data }));

	getInvoiceVendorLists = (RegionId) => {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/${RegionId}/Vendor/List`,
				{
					params: { RegionId }
				})
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};


	/**
	 * create invoice payment
	 * @param regionId
	 * @param CustomerNo
	 * @param payment Object
	 * @returns {Promise<any>}
	 */
	createInvoicePayment = (regionId, CustomerNo, payment) => {
		const data = {
			RegionId: regionId,
			CustomerNo: CustomerNo,
			Payment: payment,
		};
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/payment/create/`, data)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};

	createInvoiceCredit = (regionId, CustomerNo, payment) => {
		const data = {
			RegionId: regionId,
			CustomerNo: CustomerNo,
			Payment: payment,
		};
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/payment/createCredit`, data)
				.then(res => {
					if (res.status === 200) {
						resolve(res.data);
					}
					else if (res.status !== 200) {
						reject(res.data);
					}
				})
				.catch(error => {
					resolve(error);
				})
		});
	};
}

const instance = new invoiceService();
export default instance;
