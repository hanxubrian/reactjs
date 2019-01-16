class Utils {
	static getCustomerListFromDb = (customerDb) => {
		let customerList = [];
		if (customerDb === null || customerDb === undefined) return;

		customerDb.Data.Regions.forEach(x => {
			customerList = [...customerList, ...x.CustomerList];
		});

		return customerList;
	};
}
export default Utils;