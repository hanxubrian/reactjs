import {agingService} from "../../services"

export const GET_AGING_REPORTS_SUCCESS = "[AGING] GETS REPORTS SUCCESS";
export const GET_AGING_REPORTS_ERROR = "[AGING] GETS REPORTS ERROR";
export const GET_STARTED_AGINGS_FETCH = "[AGING] GET STARTED FETCH";
export const TOGGLE_AGING_FILTER_PANEL = "[AGING] TOGGLE FILTER PANEL";

export function getAgingReports(regionId, params) {
    return (dispatch) => {

        dispatch({
            type: GET_STARTED_AGINGS_FETCH,
            payload: true
        });

        (async () => {
            let res = await agingService.getAgingReports(regionId, params);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_AGING_REPORTS_SUCCESS,
                    payload: res.Data
                });
            } else {
                dispatch({
                    type: GET_AGING_REPORTS_ERROR,
                    payload: res.message
                });
            }
        })();
    };
}


export function toggleAgingFilterPanel(){
    return {
        type: TOGGLE_AGING_FILTER_PANEL
    }
}
