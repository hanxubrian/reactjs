import axios from "axios";

export const GET_ALL_CUSTOMERS = "[CUSTOMERS] GETS ALL";
export const DELETE_SELECTED_CUSTOMERS = "[CUSTOMERS] DELETE SELECTED";
export const REMOVE_SELECTED_CUSTOMER = "[CUSTOMER] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[CUSTOMERS] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[CUSTOMERS] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[CUSTOMERS] TOGGLE FILTER PANEL";

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


