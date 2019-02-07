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
export const GET_TRANSACTION_DETAIL = '[FRANCHISEE-TRANSACTION] GET TRANSACTION DETAIL';
export const RESET_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] RESET TRANSACTION FORM';
export const UPDATE_A_FRANCHISEE_TRANSACTION = '[FRANCHISEE-TRANSACTION] UPDATE A FRANCHISEE TRANSACTION';
export const GET_FRANCHISEE_TRANSACTION_TYPE_LIST = '[FRANCHISEE-TRANSACTION] GET FRANCHISEE TRANSACTION TYPE LIST';
export const NULLIFY_FRANCHISEE_REPORT = '[FRANCHISEE-TRANSACTION] NULLIFY FRANCHISEE REPORT';
export const GET_FRANCHISEE_TRANSACTION_TAX_AMOUNT = '[FRANCHISEE-TRANSACTION] GET FRANCHISEE TRANSACTION TAX AMOUNT';

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

export function removeTransaction(regionId, id) {
    return (dispatch) => {
        (async () => {
            let res = await franchiseesService.removeFranchiseeTransaction(regionId, id);
            if (res.IsSuccess) {
                dispatch({
                    type: REMOVE_SELECTED_FRANCHISEE_TRANSACTION,
                    payload: res.Data
                });
            } else {

            }
        })();
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

export function openEditTransactionForm(regionId, data)
{
    return (dispatch) => {
        dispatch({
            type: START_FETCH_TRANSACTIONS,
            payload: true
        });
        (async () => {
            let res = await franchiseesService.getTransactionDetail(data.Id, regionId);
            if (res) {
                dispatch({
                    type: GET_TRANSACTION_DETAIL,
                    payload: res
                });
                dispatch({
                    type: OPEN_EDIT_TRANSACTION_FORM,
                    payload: data
                });
            } else {

            }
        })();
    };
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

export function getTransactionDetail(transactionId, regionId)
{
    return (dispatch) => {
        (async () => {
            let res = await franchiseesService.getTransactionDetail(transactionId, regionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_TRANSACTION_DETAIL,
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

/**
 * update a franchisee transaction
 * @param id
 * @param regionId
 * @param data
 * @returns {Function}
 */
export function updateFranchiseeTransaction(id, regionId, data) {
    return (dispatch) => {
        (async () => {
            let res = await franchiseesService.updateFranchiseeTransaction(id, regionId, data);
            if (res.IsSuccess) {
                dispatch({
                    type: UPDATE_A_FRANCHISEE_TRANSACTION,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function getFranchiseeTransactionTypeLists(regionId) {
    return (dispatch) => {
        (async () => {
            let res = await franchiseesService.getFranchiseeTransactionTypeLists(regionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_FRANCHISEE_TRANSACTION_TYPE_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function nullifyFranchiseeReport() {
    return {
        type: NULLIFY_FRANCHISEE_REPORT,
    }
}

export function getFranchiseeTransactionTaxAmount(regiondId, FranchiseeId, Amount, Quantity, TaxTypeId=3){
    return (dispatch) => {
        (async () => {
            let res = await franchiseesService.getFranchiseeTransactionTaxAmount(regiondId, FranchiseeId, Amount, Quantity, TaxTypeId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_FRANCHISEE_TRANSACTION_TAX_AMOUNT,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}
