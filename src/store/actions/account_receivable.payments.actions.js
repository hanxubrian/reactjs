import { invoicePaymentsService } from "services";
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


export function getAccountReceivablePaymentsList(RegionId, FromDate, ToDate, SearchText, Status) {

	RegionId = RegionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [RegionId];

	return (dispatch) => {
		dispatch({
			type: GET_ALL_RECEIVABLE_PAYMENTS_START,
			payload: true
		});

		(async () => {
			let paymentsList = await invoicePaymentsService.getAccountReceivablePaymentsList(RegionId, FromDate, ToDate, SearchText, Status);
			if (!paymentsList.IsSuccess) {
				dispatch({
					type: FAILED_GET_ALL_RECEIVABLE_PAYMENTS,
					payload: paymentsList.message
				});
			}
			dispatch({
				type: GET_ALL_RECEIVABLE_PAYMENTS,
				payload: paymentsList
			});
		})();
	}
}

export function createAccountReceivablePayment(RegionId, PaymentType, ReferenceNo, PaymentDate, Note, PayItems, overpayment, FromDate, ToDate, SearchText, Status) {

	// RegionId = RegionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [RegionId];

	return (dispatch) => {
		dispatch({
			type: CREATE_AR_PAYMENTS_START,
			payload: true
		});

		(async () => {
			// await sleep(2000)
			// let paymentCreated = [];
			let paymentCreated = await invoicePaymentsService.createAccountReceivablePayment(RegionId, PaymentType, ReferenceNo, PaymentDate, Note, PayItems);
			dispatch({
				type: CREATE_AR_PAYMENTS,
				payload: paymentCreated
			});

			await getAccountReceivablePaymentsList(RegionId, FromDate, ToDate, SearchText, Status)

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

export function openPaymentDialog(open) {
	return {
		type: OPEN_PAYMENT_DIALOG,
		payload: open
	}
}
export function setActivePaymentRows(rows) {
	return {
		type: SET_ACTIVE_PAYMENT_ROWS,
		payload: rows
	}
}