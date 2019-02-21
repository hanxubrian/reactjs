import {printChecksService} from "../../services"

export const GET_ALL_PRINT_CHECKS_LIST = "[PRINT CHECKS] GETS ALL";
export const GET_ALL_PRINT_CHECKS_LIST_ERROR = "[PRINT CHECKS] GETS ALL_ERRO";
export const START_FETCH_PRINT_CHECKS_LIST = "[PRINT CHECKS] GETS LIST";
export const GET_PRINT_CHECKS_DETAIL = "[PRINT CHECKS] GETS DETAIL";
export const GET_PRINT_CHECKS_DETAIL_ERROR = "[PRINT CHECKS] GETS DETAIL_ERROR";


export function getCheckDetailByType(regionId, ChecktypeId, EntityTypeId, Month, Year, PaymentDate, CheckDate) {
    return (dispatch) => {
        (async () => {
            dispatch({
                type: START_FETCH_PRINT_CHECKS_LIST,
                payload: true
            });

            let res = await printChecksService.getCheckByType(regionId, ChecktypeId, EntityTypeId, Month, Year, PaymentDate, CheckDate);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_ALL_PRINT_CHECKS_LIST,
                    payload: res.Data
                });
            } else {
                dispatch({
                    type: GET_ALL_PRINT_CHECKS_LIST_ERROR,
                    payload: res.message
                });
            }
        })();
    }
}
