import axios from 'axios';

const axios_instance = axios.create({
	headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	withCredentials: false
});

const BASE_API_URL = 'https://apifmsplus.jkdev.com';
const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

class CustomersService {
    /**
     * @param regionId
     * @param statusId
     * @param location
     * @param latitude
     * @param longitude
     * @param searchText
     * @returns {Promise<any>}
     */
	getCustomersList = (RegionId, StatusId, StatusNames, AccountTypeListName, Location = "all", Latitude = "", Longitude = "", SearchText = "") => {
		const data = {
			RegionId,
			StatusId,
			StatusNames: StatusNames.map(x => x.substring(0, 1)),
			AccountTypeListName,
			Location,
			Latitude,
			Longitude,
			SearchText
		};
		console.log("getCustomersList-data", data)
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/Customer/CustomerList`, data)
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
	getCustomerStatusList() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_API_URL}/v1/lists/getcustomerstatuslist?RegionId=99999`)
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
	}

	getAccountTypeList() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_API_URL}/v1/lists/GetAccountTypeList?RegionId=99999`)
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
	}
	getAccountExecutiveList() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_API_URL}/v1/lists/GetAccountExecutivesList?RegionId=2`)
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
	}
	createCustomer(regionId, param) {
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/Customer/create/${regionId}`, param)
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
	}
	getCustomer(regionId, customerId) {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Customer/${customerId}?RegionId=${regionId}`)
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
	}
	getCustomerDocuments() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_API_URL}/v1/lists/GetCustomerDocumentsRequiredList?RegionId=2`)
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
	}

	getAccountTypesGroups() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_API_URL}/v1/lists/GetAccountTypesGroups/?RegionId=2`)
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
	}

	getFindersFeesByCustomerNo(RegionId, CustomerNo) {
		// https://apifmsplusplus_mongo.jkdev.com/v1/FinderFee/finderfeesByCustomerNo?RegionId=2&CustomerNo=011050
		/*
RegionId: 0
add_on: "N"
calc_fact: "S"
company_no: "BUF701"
cust_no: "011050"
dlr_code: "701011"
dwn_take: "Y"
ff_adjtot: 0
ff_amtfin: 11733.15
ff_amtpaid: 5595.81
ff_balance: 6317.85
ff_desc: "FINDER'S FEE ON CONTRACT BILLING"
ff_down: 5
ff_dwnamt: 180.51
ff_dwnpd: "Y"
ff_factor: 0
ff_hold: "N"
ff_holdmon: 0
ff_holdyr: 0
ff_interes: 16
ff_pyamt: 180.51
ff_pybill: 30
ff_pytotl: 30
ff_seq: "1"
ff_start: 6
ff_tot: 11913.66
ff_year: 2012
ffcont: 7220.38
ffcredit: 0
ffduetot: 7220.38
fullbill: 0
		*/
		const data = {
			RegionId,
			CustomerNo,
		};
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/FinderFee/finderfeesByCustomerNo`, { params: data })
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
	}
	findersfeeConfigs() {
		/*
		{
            "_id": "5c5bbc9c7667182f003c48a2",
            "Code": "V",
            "Name": "Variable",
            "Values": {
                "DownPayPercentage": "30.0",
                "EndAmount": "3000.0",
                "Factor": "0.0",
                "MonthlyPercentage": "5.0",
                "NumOfPayments": "72",
                "StartAmount": "50.0"
            }
        },
		*/
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/FinderFee/findersfeeConfigs`)
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
	}
}


const instance = new CustomersService();
export default instance;
