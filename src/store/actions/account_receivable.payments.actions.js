import {franchiseesService} from "services";

export const GET_ALL_RECEIVABLE_PAYMENTS = "[ACCOUNT_RECEIVABLE PAYMENTS] GETS ALL";


export function getAccountReceivablePaymentsList(RegionId, FromDate,ToDate, SearchText) {

    RegionId = RegionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [RegionId];

    return (dispatch) => {
        (async () => {
            let paymentsList = await franchiseesService.getAccountReceivablePaymentsList(RegionId, FromDate, ToDate, SearchText);
            dispatch({
                type: GET_ALL_RECEIVABLE_PAYMENTS,
                payload: paymentsList
            });
        })();
    }
}
