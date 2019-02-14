import {paymentService} from "../../services";

export const GET_PAYMENT_LOG_LIST         = "[PAYMENT LOG] GET PAYMENT LIST";
export const UPDATE_PAYMENT_LOG_DATE      = "[PAYMENT LOG] UPDATE LOG DATE";

export function getPaymentLogList(regionId, LogDate) {
    return (dispatch) => {
        (async () => {
            let res = await paymentService.getPaymentLogList(regionId, LogDate);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_PAYMENT_LOG_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}


export function updateLogDate(date) {
    return {
        type: UPDATE_PAYMENT_LOG_DATE,
        payload: date
    }

}
