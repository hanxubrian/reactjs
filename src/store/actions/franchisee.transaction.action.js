import axios from "axios";
import {franchiseesService} from "../../services"

export const GET_ALL_FRANCHISEE_TRANSACTIONS = "[FRANCHISEE-TRANSACTIONS] GETS ALL";
export const REMOVE_SELECTED_FRANCHISEE_TRANSACTION = "[FRANCHISEE-TRANSACTION] REMOVE SELECTED";
export const TOGGLE_TRANSACTION_FILTER_PANEL = "[FRANCHISEE-TRANSACTION] TOGGLE TRANSACTION FILTER PANEL";
export const TOGGLE_TRANSACTION_FILTER_STATUS = "[FRANCHISEE-TRANSACTION] TOGGLE TRANSACTION FILTER STATUS";
export const OPEN_NEW_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] OPEN NEW TRANSACTION FORM';
export const CLOSE_NEW_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] CLOSE NEW TRANSACTION FORM';
export const OPEN_EDIT_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] OPEN EDIT TRANSACTION FORM';
export const CLOSE_EDIT_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] CLOSE EDIT TRANSACTION FORM';
export const SELECT_TRANSACTION_FRANCHISEE = '[FRANCHISEE-TRANSACTION] SELECT TRANSACTION FRANCHISEE';
export const START_FETCH_TRANSACTIONS = '[FRANCHISEE-TRANSACTION] START FETCH TRANSACTIONS';
export const SHOW_VENDOR_DIALOG_BOX = '[FRANCHISEE-TRANSACTION] SHOW VENDOR DIALOG BOX';
export const HIDE_VENDOR_DIALOG_BOX = '[FRANCHISEE-TRANSACTION] HIDE VENDOR DIALOG BOX';
export const UPDATE_TRANSACTION_VENDOR = '[FRANCHISEE-TRANSACTION] UPDATE TRANSACTION VENDOR';
export const CREATE_NEW_TRANSACTION = '[FRANCHISEE-TRANSACTION] CREATE NEW TRANSACTION';
export const RESET_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] RESET TRANSACTION FORM';

export function getTransactions(regionId) {
    return (dispatch) => {
        dispatch({
            type: START_FETCH_TRANSACTIONS,
        });

        (async () => {
            let res = await franchiseesService.getFranchiseesTransactionList(regionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_ALL_FRANCHISEE_TRANSACTIONS,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function removeTransaction(key, transactions) {
    return dispatch => {
        const request = axios.post("/api/transactions/remove", { key: key, transactions: transactions });

        return request.then(response => {
            return dispatch({
                type: REMOVE_SELECTED_FRANCHISEE_TRANSACTION,
                payload: response.data
            });
        });
    };
}

export function toggleTransactionFilterPanel(){
    return {
        type: TOGGLE_TRANSACTION_FILTER_PANEL
    }
}

export function toggleTransactionStatus(key, status){
    return {
        type: TOGGLE_TRANSACTION_FILTER_STATUS,
        payload: {[key]: status}
    }
}

export function openNewTransactionForm()
{
    return {
        type: OPEN_NEW_TRANSACTION_FORM
    }
}

export function closeNewTransactionForm()
{
    return {
        type: CLOSE_NEW_TRANSACTION_FORM
    }
}

export function openEditTransactionForm(data)
{
    return {
        type: OPEN_EDIT_TRANSACTION_FORM,
        payload: data
    }
}

export function closeEditTransactionForm()
{
    return {
        type: CLOSE_EDIT_TRANSACTION_FORM
    }
}


export function selectFranchisee(obj) {
    return {
        type: SELECT_TRANSACTION_FRANCHISEE,
        payload: obj
    }
}


export function showVendorDialogBox() {
    return {
        type: SHOW_VENDOR_DIALOG_BOX
    }
}

export function hideVendorDialogBox() {
    return {
        type: HIDE_VENDOR_DIALOG_BOX
    }
}

export function updateVendor(vendor) {
    return {
        type: UPDATE_TRANSACTION_VENDOR,
        payload: vendor
    }
}

export function createNewTransaction(regionId, data)
{
    return (dispatch) => {
        (async () => {
            let res = await franchiseesService.createFranchiseeTransaction(regionId, data);
            if (res.IsSuccess) {
                dispatch({
                    type: CREATE_NEW_TRANSACTION,
                    payload: res
                });
            } else {

            }
        })();
    };
}


export function resetTransactionForm() {
    return {
        type: RESET_TRANSACTION_FORM,
    }
}

