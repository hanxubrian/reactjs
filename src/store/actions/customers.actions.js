import axios from "axios";

export const GET_ALL_CUSTOMERS = "[CUSTOMERS] GETS ALL";
export const DELETE_SELECTED_CUSTOMERS = "[CUSTOMERS] DELETE SELECTED";
export const REMOVE_SELECTED_CUSTOMER = "[CUSTOMER] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[CUSTOMERS] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[CUSTOMERS] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[CUSTOMERS] TOGGLE FILTER PANEL";

// for Add/Edit
export const OPEN_NEW_CUSTOMER_DIALOG = '[CUSTOMERS APP] OPEN NEW CUSTOMER DIALOG';
export const CLOSE_NEW_CUSTOMER_DIALOG = '[CUSTOMERS APP] CLOSE NEW CUSTOMER DIALOG';
export const OPEN_EDIT_CUSTOMER_DIALOG = '[CUSTOMERS APP] OPEN EDIT CUSTOMER DIALOG';
export const CLOSE_EDIT_CUSTOMER_DIALOG = '[CUSTOMERS APP] CLOSE EDIT CUSTOMER DIALOG';
export const ADD_CUSTOMER = '[CUSTOMERS APP] ADD CUSTOMER';
export const UPDATE_CUSTOMER = '[CUSTOMERS APP] UPDATE CUSTOMER';

export function getCustomers() {
    return dispatch => {
        const request = axios.get("/api/customers/gets");

        return request.then(response => {
            return dispatch({
                type: GET_ALL_CUSTOMERS,
                payload: response.data
            });
        });
    };
}

export function toggleFilterPanel(){
    return {
        type: TOGGLE_FILTER_PANEL
    }
}

export function toggleSummaryPanel(){
    return {
        type: TOGGLE_SUMMARY_PANEL
    }
}

export function toggleStatus(key, status){
    return {
        type: TOGGLE_FILTER_STATUS,
        payload: {[key]: status}
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

export function openNewCustomerDialog()
{
    return {
        type: OPEN_NEW_CUSTOMER_DIALOG
    }
}

export function closeNewCustomerDialog()
{
    return {
        type: CLOSE_NEW_CUSTOMER_DIALOG
    }
}

export function openEditCustomerDialog(data)
{
    return {
        type: OPEN_EDIT_CUSTOMER_DIALOG,
        data
    }
}

export function closeEditCustomerDialog()
{
    return {
        type: CLOSE_EDIT_CUSTOMER_DIALOG
    }
}
export function addCustomer(newCustomer)
{
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

export function updateCustomer(customer)
{
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
