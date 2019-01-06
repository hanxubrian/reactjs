import axios from "axios";
import {franchiseesService} from "../../services"

//Action Constants for Reports
export const GET_FRANCHISEE_REPORTS = "[FRANCHISEE-REPORTS] GETS";
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

export function removeReports(key, transactions) {
    return dispatch => {
        const request = axios.post("/api/transactions/remove", { key: key, transactions: transactions });

        return request.then(response => {
            return dispatch({
                type: REMOVE_SELECTED_FRANCHISEE_REPORT,
                payload: response.data
            });
        });
    };
}

export function toggleReportsFilterPanel(){
    return {
        type: TOGGLE_FRANCHISEES_REPORTS_FILTER_PANEL
    }
}


