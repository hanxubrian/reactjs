import axios from "axios";
import {
    GET_ALL_SUGGEST_CUSTOMERS, GET_ALL_SUGGEST_CUSTOMERS_ERROR,
    GET_INVOICE_DETAIL,
    GET_INVOICES_FETCH_START,
    OPEN_EDIT_INVOICE_FORM
} from "./invoice.actions";
import {paymentlockboxservice} from "../../services";


export const PAYMENT_LOCKBOX_GET_ALL_DATA_START         = "[PAYMENT LOCKBOX] GET ALL DATA START";
export const PAYMENT_LOCKBOX_GET_ALL_DATA_SUCCESS       = "[PAYMENT LOCKBOX] GET ALL DATA SUCCESS";
export const PAYMENT_LOCKBOX_GET_ALL_DATA_FAILD         = "[PAYMENT LOCKBOX] GET ALL DATA FAILD";


export function paymentlockboxgetalldata(invoiceId, regionId) {
    return (dispatch) => {
        dispatch({
            type: PAYMENT_LOCKBOX_GET_ALL_DATA_START,
            payload: true
        });
        (async () => {
            let res = await paymentlockboxservice.getallpaymentlockbox(invoiceId, regionId);
            if (res.IsSuccess) {
                dispatch({
                    type: PAYMENT_LOCKBOX_GET_ALL_DATA_SUCCESS,
                    payload: res
                });
            } else {
                dispatch({
                    type: PAYMENT_LOCKBOX_GET_ALL_DATA_FAILD,
                    payload: res.message
                });
            }
        })();
    };
}