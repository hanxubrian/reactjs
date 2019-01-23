import {invoicePaymentsService} from "services";
import {TOGGLE_FILTER_PANEL_FRANCHISEES, TOGGLE_SUMMARY_PANEL_FRANCHISEES} from "./franchise.actions";

export const GET_ALL_RECEIVABLE_PAYMENTS = "[ACCOUNT_RECEIVABLE PAYMENTS] GETS ALL";
export const ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_FILTER_PANEL = "[ACCOUNT_RECEIVABLE PAYMENTS FILTER TOGGLE] FILTER PANEL TOGGLE";
export const ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_SUMMARY_PANEL = "[ACCOUNT_RECEIVABLE PAYMENTS SUMMERY TOGGLE] SUMMERY TOGGLE";


export function getAccountReceivablePaymentsList(RegionId, FromDate,ToDate, SearchText) {

    RegionId = RegionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [RegionId];

    return (dispatch) => {
        (async () => {
            let paymentsList = await invoicePaymentsService.getAccountReceivablePaymentsList(RegionId, FromDate, ToDate, SearchText);
            dispatch({
                type: GET_ALL_RECEIVABLE_PAYMENTS,
                payload: paymentsList
            });
        })();
    }
}

export function toggleFilterPanelAccountReceivablePayments(){
    return {
        type: ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_FILTER_PANEL
    }
}

export function toggleSummaryPanelAccountReceivablePayments(){
    return {
        type: ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_SUMMARY_PANEL
    }
}