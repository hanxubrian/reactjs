import {printChecksService} from "../../services"

export const GET_ALL_PRINT_CHECKS_LIST = "[PRINT CHECKS] GETS ALL";
export const GET_ALL_PRINT_CHECKS_LIST_ERROR = "[PRINT CHECKS] GETS ALL_ERRO";
export const START_FETCH_PRINT_CHECKS_LIST = "[PRINT CHECKS]  START FETCH PRINT CHECKS LIST ";
export const GET_PRINT_CHECKS_DETAIL = "[PRINT CHECKS] GETS DETAIL";
export const GET_PRINT_CHECKS_DETAIL_ERROR = "[PRINT CHECKS] GETS DETAIL_ERROR";
export const UPDATE_CHECK_SELECTIONS = "[PRINT CHECKS] UPDATE CHECK SELECTIONS";


export function getCheckDetailByType(regionId, ChecktypeId, EntityTypeId, Month, Year, PaymentDate, CheckDate) {
    return (dispatch) => {
        (async () => {
            dispatch({
                type: START_FETCH_PRINT_CHECKS_LIST,
                payload: true
            });

            let res = await printChecksService.getCheckByType(regionId, ChecktypeId, EntityTypeId, Month, Year, PaymentDate, CheckDate);
            if (res.IsSuccess) {
                console.log('qqqq=', res.Data);
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
export function updateSelections(selections) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_CHECK_SELECTIONS,
            payload: selections
        });
    }
}
