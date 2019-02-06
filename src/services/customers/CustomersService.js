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
			StatusNames,
			AccountTypeListName,
			Location,
			Latitude,
			Longitude,
			SearchText
		};
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
}


const instance = new CustomersService();
export default instance;
