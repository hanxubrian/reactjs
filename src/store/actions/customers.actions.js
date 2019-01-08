import axios from "axios";
import { customersService } from "services";

export const GET_ALL_CUSTOMERS = "[CUSTOMERS] GETS ALL";
export const DELETE_SELECTED_CUSTOMERS = "[CUSTOMERS] DELETE SELECTED";
export const REMOVE_SELECTED_CUSTOMER = "[CUSTOMER] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[CUSTOMERS] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[CUSTOMERS] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[CUSTOMERS] TOGGLE FILTER PANEL";
export const TOGGLE_MAP_VIEW = '[CUSTOMERS] TOGGLE MAP VIEW';

// for Add/Edit
export const OPEN_NEW_CUSTOMER_FORM = '[CUSTOMERS APP] OPEN NEW CUSTOMER FORM';
export const CLOSE_NEW_CUSTOMER_FORM = '[CUSTOMERS APP] CLOSE NEW CUSTOMER FORM';
export const OPEN_EDIT_CUSTOMER_FORM = '[CUSTOMERS APP] OPEN EDIT CUSTOMER FORM';
export const CLOSE_EDIT_CUSTOMER_FORM = '[CUSTOMERS APP] CLOSE EDIT CUSTOMER FORM';
export const ADD_CUSTOMER = '[CUSTOMERS APP] ADD CUSTOMER';
export const UPDATE_CUSTOMER = '[CUSTOMERS APP] UPDATE CUSTOMER';

export function getCustomers(regionId, statusId, location, latitude, longitude, searchText) {
	// return dispatch => {
	// const request = axios.get("/api/customers/gets");

	// return request.then(response => {
	//     return dispatch({
	//         type: GET_ALL_CUSTOMERS,
	//         payload: response.data
	//     });
	// });

	// };
	return (dispatch) => {
		(async () => {
			regionId = regionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [regionId]
			statusId = statusId === 0 ? Array.from({ length: 10 }).map((item, index) => (index + 1)) : [statusId]
			console.log(regionId, statusId)
			let response = await customersService.getCustomersList(regionId, statusId, location, latitude, longitude, searchText);
			dispatch({
				type: GET_ALL_CUSTOMERS,
				payload: response
			});
		})();
	}

}

export function toggleFilterPanel() {
	return {
		type: TOGGLE_FILTER_PANEL
	}
}

export function toggleSummaryPanel() {
	return {
		type: TOGGLE_SUMMARY_PANEL
	}
}

export function toggleMapView() {
	return {
		type: TOGGLE_MAP_VIEW
	}
}
export function toggleStatus(key, status) {
	return {
		type: TOGGLE_FILTER_STATUS,
		payload: { [key]: status }
	}
}

export function deleteCustomers(keys, customers) {
	return dispatch => {
		const request = axios.post("/api/customers/delete", { ids: keys, customers: customers });

		return request.then(response => {
			return dispatch({
				type: DELETE_SELECTED_CUSTOMERS,
				payload: response.data
			});
		});
	};
}

export function removeCustomer(key, customers) {
	return dispatch => {
		const request = axios.post("/api/customers/remove", { id: key, customers: customers });

		return request.then(response => {
			return dispatch({
				type: REMOVE_SELECTED_CUSTOMER,
				payload: response.data
			});
		});
	};
}

export function openNewCustomerForm() {
	return {
		type: OPEN_NEW_CUSTOMER_FORM
	}
}

export function closeNewCustomerForm() {
	return {
		type: CLOSE_NEW_CUSTOMER_FORM
	}
}

export function openEditCustomerForm(data) {
	return {
		type: OPEN_EDIT_CUSTOMER_FORM,
		data
	}
}

export function closeEditCustomerForm() {
	return {
		type: CLOSE_EDIT_CUSTOMER_FORM
	}
}
export function addCustomer(newCustomer) {
	return (dispatch, getState) => {

		console.log('state', getState());

		// const {routeParams} = getState().contactsApp.contacts;

		const request = axios.post('/api/contacts-app/add-contact', {
			newCustomer
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: ADD_CUSTOMER
				})
			]).then(() => dispatch(getCustomers()))
		);
	};
}

export function updateCustomer(customer) {
	return (dispatch, getState) => {

		// const {routeParams} = getState().contactsApp.contacts;

		const request = axios.post('/api/contacts-app/update-contact', {
			customer
		});

		return request.then((response) =>
			Promise.all([
				dispatch({
					type: UPDATE_CUSTOMER
				})
			]).then(() => dispatch(getCustomers()))
		);
	};
}
