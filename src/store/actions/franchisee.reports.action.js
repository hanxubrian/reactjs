import {franchiseesService} from "../../services"

//Action Constants for Reports
export const GET_FRANCHISEE_REPORTS = "[FRANCHISEE-REPORTS] GETS";
export const GET_FRANCHISEE_REPORT_DETAIL = "[FRANCHISEE-REPORTS] GET A REPORT";
export const CREATE_FRANCHISEE_REPORT_DETAIL = "[FRANCHISEE-REPORTS] CREATE A REPORT";
export const CREATE_FRANCHISEE_REPORT_DETAIL_ERROR = "[FRANCHISEE-REPORTS] CREATE A REPORT ERROR";
export const GET_FRANCHISEE_REPORTS_FETCH_START = "[FRANCHISEE-REPORTS] GETS FETCH START";
export const TOGGLE_FRANCHISEES_REPORTS_FILTER_PANEL = "[FRANCHISEE-REPORT] TOGGLE REPORTS FILTER PANEL";
export const UPDATE_REPORT_DATE = "[FRANCHISEE-REPORT] UPDATE DATE";

/**
 * @param regionId
 * @param year
 * @param month
 * @returns {function(*): Promise<T | never>}
 */
export function getReports(regionId=2, year="2017", month="01") {
    return (dispatch) => {

        dispatch({
            type: GET_FRANCHISEE_REPORTS_FETCH_START,
            payload: true
        });

        (async () => {
            let res = await franchiseesService.getFranchiseesReportsList(regionId, year, month);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_FRANCHISEE_REPORTS,
                    payload: res
                });
            } else {
                dispatch({
                    type: CREATE_FRANCHISEE_REPORT_DETAIL_ERROR,
                    payload: res.message
                });
            }
        })();
    };
}

export function getReport(params) {
    return (dispatch) => {
        (async () => {
            let res = await franchiseesService.getFranchiseeReport(params);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_FRANCHISEE_REPORT_DETAIL,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function toggleReportsFilterPanel(){
    return {
        type: TOGGLE_FRANCHISEES_REPORTS_FILTER_PANEL
    }
}

export function updateReportDate(date) {
    return {
        type: UPDATE_REPORT_DATE,
        payload: date
    }
}

export function createReport(params) {
    if(Object.keys(params).length===0) return;
    console.log('params for action=', Object.keys(params).length)

    return (dispatch) => {
        dispatch({
            type: GET_FRANCHISEE_REPORTS_FETCH_START,
            payload: true
        });
        (async () => {
            let res = await franchiseesService.createFranchiseeReport(params);
            if (res.IsSuccess) {
                dispatch({
                    type: CREATE_FRANCHISEE_REPORT_DETAIL,
                    payload: res
                });
            } else {
                dispatch({
                    type: CREATE_FRANCHISEE_REPORT_DETAIL_ERROR,
                    payload: res.message
                });
            }
        })();
    };
}

