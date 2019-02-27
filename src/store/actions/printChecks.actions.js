import {printChecksService} from "../../services"

export const GET_ALL_PRINT_CHECKS_LIST = "[PRINT CHECKS] GETS ALL";
export const GET_ALL_PRINT_CHECKS_LIST_ERROR = "[PRINT CHECKS] GETS ALL_ERRO";
export const START_FETCH_PRINT_CHECKS_LIST = "[PRINT CHECKS]  START FETCH PRINT CHECKS LIST ";
export const GET_PRINT_CHECKS_DETAIL = "[PRINT CHECKS] GETS DETAIL";
export const GET_PRINT_CHECKS_DETAIL_ERROR = "[PRINT CHECKS] GETS DETAIL_ERROR";
export const UPDATE_CHECK_SELECTIONS = "[PRINT CHECKS] UPDATE CHECK SELECTIONS";
export const TOGGLE_FILTER_PANEL_CHECK_PRINTING = "[PRINT CHECKS] TOGGLE FILTER PANEL";
export const NULLIFY_CHECKS_OBJ = "[PRINT CHECKS] NULLIFY CHECKS OBJ";
export const SET_CHECKS_OBJ = "[PRINT CHECKS] SET_CHECKS_OBJ";
export const UPDATE_CHECKS_FILTER_PARAMETER = "[PRINT CHECKS] UPDATE CHECKS FILTER PARAMETER";


export function getCheckTypes() {
    return (dispatch) => {
        (async () => {
            let res = await printChecksService.getCheckTypes();
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
                    type: GET_PRINT_CHECKS_DETAIL,
                    payload: res.Data
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


export function updateSelections(selections) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_CHECK_SELECTIONS,
            payload: selections
        });
    }
}

export function toggleFilterPanel_pc() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_FILTER_PANEL_CHECK_PRINTING,
        });
    }
}

export function nullifyChecksObj() {
    return (dispatch) => {
        dispatch({
            type: NULLIFY_CHECKS_OBJ,
        });
    }
}

export function setCheckObj(obj) {
    return (dispatch) => {
        dispatch({
            type: SET_CHECKS_OBJ,
            payload: obj
        });
    }
}

export function updateFilterParams(param) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_CHECKS_FILTER_PARAMETER,
            payload: param
        });
    }
}
