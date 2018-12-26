import axios from "axios";

export const GET_ALL_BILLRUNS = "[BILL-RUNS] GETS ALL";
export const REMOVE_SELECTED_BILLRUN = "[BILL-RUN] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[INVOICES] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[INVOICES] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[INVOICES] TOGGLE FILTER PANEL";

export function getBillruns() {
    return dispatch => {
        const request = axios.get("/api/billruns/gets");

        return request.then(response => {
            return dispatch({
                type: GET_ALL_BILLRUNS,
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

export function removeBillrun(key, invoices) {
    return dispatch => {
        const request = axios.post("/api/billruns/remove", { id: key, invoices: invoices });

        return request.then(response => {
            return dispatch({
                type: REMOVE_SELECTED_BILLRUN,
                payload: response.data
            });
        });
    };
}


