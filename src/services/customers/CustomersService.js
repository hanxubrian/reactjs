import axios from 'axios';
import moment from "moment"
import { BASE_MONGO_API_URL } from './../../services'

const axios_instance = axios.create({
	headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	withCredentials: false
});

const BASE_API_URL = 'https://apifmsplus.jkdev.com';
// const BASE_MONGO_API_URL = 'https://apifmsplusplus_mongo.jkdev.com';

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
			SearchText: ""
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
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/GetCustomerStatus`)
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
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/accountTypes`)
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
	getAccountExecutiveList(RegionId) {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/account/executives?RegionId=${RegionId}`)
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
	getLogCallCustomerServiceTypes() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/reasons?type=customer_service`)
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
	customerServiceCreate(regionId, data) {
		// const data = {
		// 	"_id": "sample string 1",
		// 	"call_com": "sample string 2",
		// 	"sys_cust": "sample string 3",
		// 	"cust_no": "sample string 4",
		// 	"call_date": "sample string 5",
		// 	"call_time": "sample string 6",
		// 	"call_stat": "sample string 7",
		// 	"stat_otr": "sample string 8",
		// 	"spoke_with": "sample string 9",
		// 	"call_back": "sample string 10",
		// 	"call_btime": "sample string 11",
		// 	"action": "sample string 12",
		// 	"action_otr": "sample string 13",
		// 	"init_call": "sample string 14",
		// 	"area": "sample string 15"
		// }
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/Service/Create`, data)
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
	customerCollectionCreate(regionId, data) {
		// const data = {
		// 	"_id": "sample string 1",
		// 	"cust_name": "sample string 2",
		// 	"call_com": "sample string 3",
		// 	"sys_cust": 4,
		// 	"cust_no": "sample string 5",
		// 	"call_date": "sample string 6",
		// 	"call_time": "sample string 7",
		// 	"call_stat": 8,
		// 	"stat_otr": "sample string 9",
		// 	"spoke_with": "sample string 10",
		// 	"call_back": "sample string 11",
		// 	"call_btime": "sample string 12",
		// 	"action": 13,
		// 	"action_otr": "sample string 14"
		// }
		console.log("customerCollectionCreate-data", data)
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/Collection/Create`, data)
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
		console.log("createCustomer-param", param)
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
	updateCustomer(regionId, param) {
		console.log("updateCustomer-param", param)
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/Customer/update/${param._id}?regionId=${regionId}`, param)
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
		console.log("getCustomer", customerId)
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
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/accountTypeGroups`)
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

	stopFindersfees(regionId, fran_id) {
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/FinderFee/Stop/${fran_id}?regionId=${regionId}`)
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
	getCustomerServiceList(regionId, CustomerNo, fromDate, toDate) {
		const data = {
			CustomerNo: [CustomerNo],
			fromDate: "01/01/2000",
			toDate: "12/30/2019"
		}
		console.log("getCustomerServiceList", data)
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/Service/List`, data)
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
	getCustomerCollectionList(regionId, CustomerNo, fromDate, toDate) {
		const data = {
			CustomerNo: [CustomerNo],
			fromDate: moment().subtract(6, 'months').format("MM/DD/YYYY"),
			toDate: moment().format("MM/DD/YYYY")
		}

		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/Collection/List`, data)
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
	getCustomerBillingList(regionId, CustomerNo, BillYear, BillMonth) {
		const data = {
			CustomerNo: [CustomerNo],
			BillYear,
			BillMonth
		}
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Payment/BillingsByCustNo`, data)
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

	getFranchiseeServiceTypes(regionId) {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/api/Lists/GetServiceType?RegionId=${regionId}&BillingTypeId=4`)
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
	getFranchiseeBillingTypes(regionId) {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/api/Lists/GetBillingType?RegionId=${regionId}`)
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

	getIncreaseDecrease(regionId, params) {
		console.log('params=', params);
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/IncreaseDecrease`, params)
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
	getFinderFeeTypes() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/GetFinderFeeTypes`)
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
	getComputedFinderFee(data) {
		// const data = {
		// 	"RegionId": 1,
		// 	"CalculationMethodCode": "sample string 2",
		// 	"FranchiseeNum": "sample string 3",
		// 	"CustomerNum": "sample string 4",
		// 	"AmountPayableOn": 5.1,
		// 	"DownPaymentPercent": 6.1,
		// 	"DownPaymentAmount": 7.1,
		// 	"MonthlyPaymentPercent": 8.1,
		// 	"MonthlyPaymentAmount": 9.1,
		// 	"NumberOfPayments": 10,
		// 	"AmountFinanced": 11.1,
		// 	"FinderFeeTotal": 12.1,
		// 	"Balance": 13.1,
		// 	"MultiTenantOccupancy": 14.1
		// }
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/FinderFee/GetComputedFinderFee`, data)
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
	getFinderFee(RegionId, Id) {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/FinderFee/${Id}?RegionId=${RegionId}`)
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

    /**
     *
     * @param regionId
     * @param customerNo
     * @param params, JSON object
     * @returns {Promise<any>}
     * @constructor
     */
	updateAssignedFranchisee(regionId, customerNo, params) {
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/AssignedFranchisee?CustomerNo=${customerNo}`, params)
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
	saveCancelContract(regionId, cust_no, cancel_date, reason_id, reason_note, lastday_service, client_credit_amount, canc_fee, continue_findersfee) {
		const data = {
			cancel_date,
			region_id: reason_id,
			region_note: reason_note,
			lastday_service,
			client_credit_amount, //double
			canc_fee,//double
			continue_findersfee,//bool
		}
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/Cancel?cust_no=${cust_no}`, data)
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
	saveSuspendContract(regionId, cust_no, reason_id, notes, suspend_date, restart_date) {
		const params = {
			cust_no,
			reason_id,
			notes,
			suspend_date,
			restart_date
		}
		console.log("saveSuspendContract", `${BASE_MONGO_API_URL}/v1/${regionId}/Customer/Suspend?cust_no=${cust_no}&reason_id=${reason_id}&notes=${notes}&suspend_date=${suspend_date}&restart_date=${restart_date}`)
		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/Suspend?cust_no=${cust_no}&reason_id=${reason_id}&notes=${notes}&suspend_date=${suspend_date}&restart_date=${restart_date}`)
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
	getReasonList(type) {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/reasons?type=${type}`)
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
	getCancelReason() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/reasons?type=account_cancellation`)
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
	getSuspendReason() {
		return new Promise((resolve, reject) => {
			axios_instance.get(`${BASE_MONGO_API_URL}/v1/Lists/reasons?type=account_suspension`)
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
	transferAssignedFranchisee(regionId, CustomerNo, FromFranchiseeNo, reason, notes, transfer_fee, franchisee) {

		return new Promise((resolve, reject) => {
			axios_instance.post(`${BASE_MONGO_API_URL}/v1/${regionId}/Customer/TransferAssignedFranchisee?CustomerNo=${CustomerNo}&FromFranchiseeNo=${FromFranchiseeNo}&reason=${reason}&notes=${notes}&transfer_fee=${transfer_fee}`, franchisee)
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
