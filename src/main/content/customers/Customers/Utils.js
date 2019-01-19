class Utils {
	static getCustomerListFromDb = (customerDb) => {
		let customerList = [];
		if (customerDb === null || customerDb === undefined) return;

		customerDb.Data.Regions.forEach(x => {
			customerList = [...customerList, ...x.CustomerList];
		});

		return customerList;
	};

	static capital_letter(str) {
		str = str.split(" ").map(x => {
			if (x.length > 1) {
				return x[0].toUpperCase() + x.substr(1).toLowerCase();
			} else if (x.length > 0) {
				return x[0].toUpperCase();
			} else {
				return "";
			}
		});

		return str.join(" ");
	}
}
export default Utils;