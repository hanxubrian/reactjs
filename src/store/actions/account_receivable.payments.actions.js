import { paymentService } from "services";
import { TOGGLE_FILTER_PANEL_FRANCHISEES, TOGGLE_SUMMARY_PANEL_FRANCHISEES } from "./franchise.actions";

export const GET_ALL_RECEIVABLE_PAYMENTS = "[A.R.Payments] GETS ALL";
export const ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_FILTER_PANEL = "[A.RPayments] FILTER PANEL TOGGLE";
export const ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_SUMMARY_PANEL = "[A.R.Payments] SUMMERY TOGGLE";

export const GET_ALL_RECEIVABLE_PAYMENTS_START = "[A.R.Payments] GET_ALL_RECEIVABLE_PAYMENTS_START";
export const APPLY_SEARCH_TEXT_ARP = "[A.R.Payments] APPLY_SEARCH_TEXT_ARP";
export const OPEN_PAYMENT_DIALOG = "[A.R.Payments] OPEN_PAYMENT_DIALOG";

export const SET_ACTIVE_PAYMENT_ROWS = "[A.R.Payments] SET_ACTIVE_PAYMENT_ROWS";

export const CREATE_AR_PAYMENTS = "[A.R.Payments] CREATE_AR_PAYMENTS";
export const CREATE_AR_PAYMENTS_START = "[A.R.Payments] CREATE_AR_PAYMENTS_START";
export const FAILED_GET_ALL_RECEIVABLE_PAYMENTS = "[A.R.Payments] FAILED_GET_ALL_RECEIVABLE_PAYMENTS";
export const SHOW_ERROR_DIALOG = "[A.R.Payments] SHOW_ERROR_DIALOG";
export const SET_PAYMENT_STATUS_FILTER = "[A.R.Payments] SET_PAYMENT_STATUS_FILTER";
export const SET_VIEW_MODE = "[A.R.Payments] SET_VIEW_MODE";
export const SET_CUSTOMER_NAME_NO_GROUPING = "[A.R.Payments] SET_CUSTOMER_NAME_NO_GROUPING";


export const GET_PAYMENT_HISTORY = "[A.R.Payments] GET_PAYMENT_HISTORY";
export const GET_PAYMENT_HISTORY_FAILED = "[A.R.Payments] GET_PAYMENT_HISTORY_FAILED";
export const GET_PAYMENT_HISTORY_START = "[A.R.Payments] GET_PAYMENT_HISTORY_START";
export const SET_PAYMENT_HISTORY_FILTER_PAYMENT_TYPES = "[A.R.Payments] SET_PAYMENT_HISTORY_FILTER_PAYMENT_TYPES";

export const FILTER_PAYMENT_START_DATE = "[A.R.Payments] FILTER_PAYMENT_START_DATE";
export const FILTER_PAYMENT_END_DATE = "[A.R.Payments] FILTER_PAYMENT_END_DATE";

export const GET_PAYMENT_TYPES = "[A.R.Payments] GET_PAYMENT_TYPES";

export function getAccountReceivablePaymentsList(RegionId, FromDate, ToDate, SearchText, Status) {

	RegionId = RegionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [RegionId];

	return (dispatch) => {
		dispatch({
			type: GET_ALL_RECEIVABLE_PAYMENTS_START,
			payload: true
		});

		(async () => {
			let paymentsList = await paymentService.getAccountReceivablePaymentsList(RegionId, FromDate, ToDate, SearchText, Status);
			dispatch({
				type: FAILED_GET_ALL_RECEIVABLE_PAYMENTS,
				payload: paymentsList.IsSuccess ? "Empty Data" : paymentsList.message
			});
			dispatch({
				type: GET_ALL_RECEIVABLE_PAYMENTS,
				payload: paymentsList
			});
		})();
	}
}
export function getPaymentHistory(regionId, fromDate, toDate, status, paymentTypes = []) {

	return (dispatch) => {
		dispatch({
			type: GET_PAYMENT_HISTORY_START,
			payload: true
		});

		(async () => {
			let res = await paymentService.getPaymentHistory(regionId, fromDate, toDate, status, paymentTypes);
			dispatch({
				type: GET_PAYMENT_HISTORY_FAILED,
				payload: res.IsSuccess ? "Empty Data" : res.message
			});
			dispatch({
				type: GET_PAYMENT_HISTORY,
				payload: res
			});
		})();
	}
}
export function getPaymentTypes() {

	return (dispatch) => {

		(async () => {
			let res = await paymentService.getPaymentTypes();
			dispatch({
				type: GET_PAYMENT_TYPES,
				payload: res.Data
			});
		})();
	}
}

export function createAccountReceivablePayment(
	RegionId,
	customerNumber,

	PaymentType,
	ReferenceNo,
	PaymentDate,
	PaymentNote,
	overpayment,
	PaymentAmount,
	PaymentAmountApplied,

	PayItems,

	fromDate,
	toDate,
	SearchText,
	status
) {

	// RegionId = RegionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [RegionId];

	return (dispatch) => {
		dispatch({
			type: CREATE_AR_PAYMENTS_START,
			payload: true
		});

		(async () => {
			// await sleep(2000)
			// let paymentCreated = [];
			let paymentCreated = await paymentService.createAccountReceivablePayment(
				RegionId,
				customerNumber,

				PaymentType,
				ReferenceNo,
				PaymentDate,
				PaymentNote,
				overpayment,
				PaymentAmount,
				PaymentAmountApplied,

				PayItems,
			);
			dispatch({
				type: CREATE_AR_PAYMENTS,
				payload: paymentCreated
			});
			//
			// re-fetch payment list
			//
			dispatch({
				type: GET_ALL_RECEIVABLE_PAYMENTS_START,
				payload: true
			});

			RegionId = RegionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [RegionId];
			let paymentsList = await paymentService.getAccountReceivablePaymentsList(
				RegionId,
				fromDate,
				toDate,
				SearchText,
				status
			);

			if (!paymentsList.IsSuccess) {
				dispatch({
					type: FAILED_GET_ALL_RECEIVABLE_PAYMENTS,
					payload: paymentsList.IsSuccess ? "Empty Data" : paymentsList.message
				});
			}

			dispatch({
				type: GET_ALL_RECEIVABLE_PAYMENTS,
				payload: paymentsList
			});

		})();
	}
}
const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function toggleFilterPanelAccountReceivablePayments() {
	return {
		type: ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_FILTER_PANEL
	}
}

export function toggleSummaryPanelAccountReceivablePayments() {
	return {
		type: ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_SUMMARY_PANEL
	}
}

export function applySearchText_ARP(s) {
	return {
		type: APPLY_SEARCH_TEXT_ARP,
		payload: s
	}
}

export function openPaymentDialog(param) {
	return {
		type: OPEN_PAYMENT_DIALOG,
		payload: param
	}
}
export function setActivePaymentRows(rows) {
	return {
		type: SET_ACTIVE_PAYMENT_ROWS,
		payload: rows
	}
}
export function showErrorDialog(params) {
	return {
		type: SHOW_ERROR_DIALOG,
		payload: params
	}
}
export function setPaymentStatusFitler(statuses) {
	return {
		type: SET_PAYMENT_STATUS_FILTER,
		payload: statuses
	}
}
export function setViewMode(mode) {
	return {
		type: SET_VIEW_MODE,
		payload: mode
	}
}
export function setCustomerNameNoGrouping(grouping) {
	return {
		type: SET_CUSTOMER_NAME_NO_GROUPING,
		payload: grouping
	}
}
export function setPaymentHistoryFilterPaymentTypes(types) {
	return {
		type: SET_PAYMENT_HISTORY_FILTER_PAYMENT_TYPES,
		payload: types
	}
}
export function updateFilterDate(key, date) {
	// FILTER_PAYMENT_START_DATE
	// FILTER_PAYMENT_END_DATE
	return {
		type: key,
		payload: date
	}
}