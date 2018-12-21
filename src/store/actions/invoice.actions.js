import axios from "axios";

export const GET_ALL_INVOICES = "[INVOICES] GETS ALL";

export function getInvoices() {
    return dispatch => {
        const request = axios.get("/api/invoices/gets");

        return request.then(response => {
            return dispatch({
                type: GET_ALL_INVOICES,
                payload: response.data
            });
        });
    };
}
