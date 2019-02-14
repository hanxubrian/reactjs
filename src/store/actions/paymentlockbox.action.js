import {paymentlockboxservice} from "../../services";

export const PAYMENT_LOCKBOX_GET_ALL_DATA_START         = "[PAYMENT LOCKBOX] GET ALL DATA START";
export const PAYMENT_LOCKBOX_GET_ALL_DATA_SUCCESS       = "[PAYMENT LOCKBOX] GET ALL DATA SUCCESS";
export const PAYMENT_LOCKBOX_GET_ALL_DATA_FAILD         = "[PAYMENT LOCKBOX] GET ALL DATA FAILD";

export const PAYMENT_LOCKBOX_FILE_UPLOAD_START         = "[PAYMENT LOCKBOX] FILE UPLOAD START";
export const PAYMENT_LOCKBOX_FILE_UPLOAD_SUCCESS       = "[PAYMENT LOCKBOX] FILE UPLOAD SUCCESS";
export const PAYMENT_LOCKBOX_FILE_UPLOAD_FAILD         = "[PAYMENT LOCKBOX] FILE UPLOAD FAILD";


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
export function paymentlockboxfileupload(file) {
    return (dispatch) => {
        dispatch({
            type: PAYMENT_LOCKBOX_FILE_UPLOAD_START,
            payload: true
        });
        (async () => {
            let res = await paymentlockboxservice.fileupload(file);
            if(res.uploadingnow && res.progress>0){
                console.log("res.progress",res.progress);
            }
            if (res.IsSuccess) {
                dispatch({
                    type: PAYMENT_LOCKBOX_FILE_UPLOAD_SUCCESS,
                    payload: res
                });
            } else {
                dispatch({
                    type: PAYMENT_LOCKBOX_FILE_UPLOAD_FAILD,
                    payload: res.message
                });
            }
        })();
    };
}
