import {verificationService} from "../../services";

export const GET_ALL_VERIFICATIONS = "[VERIFICATIONS APP] GETS ALL";
export const GET_ALL_PENDING_LISTS = "[VERIFICATIONS APP] GETS ALL PENDING INVOICES & TRANSACTIONS";
export const GET_STARTED_FETCHING_PENDING_LISTS = "[VERIFICATIONS APP] GET STARTED FETCHING ALL PENDING INVOICES & TRANSACTIONS";
export const GET_ALL_PENDING_LISTS_ERROR = "[VERIFICATIONS APP] GETS ALL ENDING INVOICES & TRANSACTIONS ERROR";
export const TOGGLE_VERIFICATION_SUMMARY_PANEL = "[VERIFICATIONS APP] TOGGLE SUMMARY PANEL";
export const TOGGLE_VERIFICATION_FILTER_STATUS = "[VERIFICATIONS APP] TOGGLE VERIFICATION FILTER STATUS";
export const TOGGLE_VERIFICATION_FILTER_PANEL = "[VERIFICATIONS APP] TOGGLE VERIFICATION FILTER PANEL";
export const UPDATE_SELECTION_ROW_LENGTH = "[VERIFICATIONS APP] UPDATE VERIFICATION SELECTION ROWS LENGTH";
export const OPEN_VERIFICATION_DIALOG = "[VERIFICATIONS APP] OPEN VERIFICATION DIALOG ";
export const CLOSE_VERIFICATION_DIALOG = "[VERIFICATIONS APP] CLOSE VERIFICATION DIALOG ";

export const OPEN_CLOSE_REVISE_DIALOG = "[VERIFICATIONS APP] OPEN/CLOSE REVISE DIALOG ";
export const OPEN_CLOSE_REJECT_DIALOG = "[VERIFICATIONS APP] OPEN/CLOSE REJECT DIALOG ";

// for Add/Edit
export const OPEN_NEW_VERIFICATION_FORM = '[VERIFICATIONS APP] OPEN NEW CUSTOMER FORM';
export const CLOSE_NEW_VERIFICATION_FORM = '[VERIFICATIONS APP] CLOSE NEW CUSTOMER FORM';
export const UPDATE_FROM_DATE_VERIFICATION = '[VERIFICATIONS APP] UPDATE FROM DATE';
export const UPDATE_TO_DATE_VERIFICATION = '[VERIFICATIONS APP] UPDATE TO DATE';
export const UPDATE_VERIFY_OPTION = '[VERIFICATIONS APP] VERIFICATION OPTION';


export function getInvoiceTransactionPendingLists(regionId) {
    return (dispatch) => {
        dispatch({
            type: GET_STARTED_FETCHING_PENDING_LISTS
        });

        (async () => {
            let res = await verificationService.getInvoiceTransactionPendingList(regionId);
            if (res.IsSuccess) {
            dispatch({
                type: GET_ALL_PENDING_LISTS,
                payload: res
            });
            }  else {
                dispatch({
                    type: GET_ALL_PENDING_LISTS_ERROR,
                    payload: res.message
                });
            }
        })();
    }
}


export function getInvoiceTransactionPendingLists1(regionId, fromDate, toDate) {
    return (dispatch) => {
        dispatch({
            type: GET_STARTED_FETCHING_PENDING_LISTS
        });

        (async () => {
            let res = await verificationService.getInvoiceTransactionPendingList1(regionId, fromDate, toDate);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_ALL_PENDING_LISTS,
                    payload: res
                });
            }  else {
                dispatch({
                    type: GET_ALL_PENDING_LISTS_ERROR,
                    payload: res.message
                });
            }
        })();
    }
}

export function toggleVerificationFilterPanel() {
    return {
        type: TOGGLE_VERIFICATION_FILTER_PANEL
    }
}

export function toggleVerificationSummaryPanel() {
    return {
        type: TOGGLE_VERIFICATION_SUMMARY_PANEL
    }
}

export function toggleVerificationStatus(key, status) {
    return {
        type: TOGGLE_VERIFICATION_FILTER_STATUS,
        payload: { [key]: status }
    }
}


export function openNewVerificationForm() {
    return {
        type: OPEN_NEW_VERIFICATION_FORM
    }
}

export function closeNewVerificationForm() {
    return {
        type: CLOSE_NEW_VERIFICATION_FORM
    }
}

export function updateSelectedRowsLength(length) {
    return {
        type: UPDATE_SELECTION_ROW_LENGTH,
        payload: length
    }
}

export function openVerificationDialog(flag){
    if(flag){
        return{
            type: OPEN_VERIFICATION_DIALOG
        }
    }else {
        return{
            type: CLOSE_VERIFICATION_DIALOG
        }
    }

}

export function openCloseReviseDialog(flag){
    return{
        type: OPEN_CLOSE_REVISE_DIALOG,
        payload : flag
    }
}

export function openCloseRejectDialog(flag){
    return{
        type: OPEN_CLOSE_REJECT_DIALOG,
        payload : flag
    }
}

export function updateVerifyPeriod(key, date) {
    return {
        type: key,
        payload: date
    }
}

export function updateVerifyOption(option) {
    return {
        type: UPDATE_VERIFY_OPTION,
        payload: option
    }
}

