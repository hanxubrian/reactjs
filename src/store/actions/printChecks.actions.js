import {printChecksService} from "../../services"

export const GET_ALL_PRINT_CHECKS_LIST = "[PRINT CHECKS] GETS ALL";
export const GET_ALL_PRINT_CHECKS_LIST_ERROR = "[PRINT CHECKS] GETS ALL_ERRO";
export const GET_PRINT_CHECKS_DETAIL = "[PRINT CHECKS] GETS DETAIL";
export const START_FETCH_PRINT_CHECKS_DETAIL = "[PRINT CHECKS] GETS DETAIL";
export const GET_PRINT_CHECKS_DETAIL_ERROR = "[PRINT CHECKS] GETS DETAIL_ERROR";


export function getCheckDetailByType(regionId, ChecktypeId, EntityTypeId, Month, Year, PaymentDate, CheckDate) {
    return (dispatch) => {
        (async () => {
            dispatch({
                type: START_FETCH_PRINT_CHECKS_DETAIL,
                payload: true
            });

            let res = await printChecksService.getCheckByType(regionId, ChecktypeId, EntityTypeId, Month, Year, PaymentDate, CheckDate);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_PRINT_CHECKS_DETAIL,
                    payload: res
                });
            } else {
                dispatch({
                    type: GET_PRINT_CHECKS_DETAIL_ERROR,
                    payload: res.message
                });
            }
        })();
    }
}
