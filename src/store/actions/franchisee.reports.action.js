import axios from "axios";
import {franchiseesService} from "../../services"

//Action Constants for Reports
export const GET_FRANCHISEE_REPORTS = "[FRANCHISEE-REPORTS] GETS";
export const GET_FRANCHISEE_REPORT_DETAIL = "[FRANCHISEE-REPORTS] GET A REPORT";
export const GET_FRANCHISEE_REPORTS_FETCH_START = "[FRANCHISEE-REPORTS] GETS FETCH START";
export const GET_FRANCHISEE_REPORTS_FETCH_END = "[FRANCHISEE-REPORTS] GETS FETCH END";
export const REMOVE_SELECTED_FRANCHISEE_REPORT = "[FRANCHISEE-REPORT] REMOVE SELECTED";
export const TOGGLE_FRANCHISEES_REPORTS_FILTER_PANEL = "[FRANCHISEE-REPORT] TOGGLE REPORTS FILTER PANEL";


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


