import axios from "axios";

export const GET_ALL_FRANCHISEE_TRANSACTIONS = "[FRANCHISEE-TRANSACTIONS] GETS ALL";
export const REMOVE_SELECTED_FRANCHISEE_TRANSACTION = "[FRANCHISEE-TRANSACTION] REMOVE SELECTED";
export const TOGGLE_TRANSACTION_FILTER_PANEL = "[FRANCHISEE-TRANSACTION] TOGGLE TRANSACTION FILTER PANEL";
export const TOGGLE_TRANSACTION_FILTER_STATUS = "[FRANCHISEE-TRANSACTION] TOGGLE TRANSACTION FILTER STATUS";
export const OPEN_NEW_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] OPEN NEW TRANSACTION FORM';
export const CLOSE_NEW_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] CLOSE NEW TRANSACTION FORM';
export const OPEN_EDIT_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] OPEN EDIT TRANSACTION FORM';
export const CLOSE_EDIT_TRANSACTION_FORM = '[FRANCHISEE-TRANSACTION] CLOSE EDIT TRANSACTION FORM';

export function getTransactions() {
    return dispatch => {
        const request = axios.get("/api/transactions/gets");

        return request.then(response => {
            return dispatch({
                type: GET_ALL_FRANCHISEE_TRANSACTIONS,
                payload: response.data
            });
        });
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
        data
    }
}

export function closeEditTransactionForm()
{
    return {
        type: CLOSE_EDIT_TRANSACTION_FORM
    }
}
