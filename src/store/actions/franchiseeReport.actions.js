import axios from "axios";
import {franchiseeReportService, franchiseesService} from "../../services";
import {GET_FRANCHISEE_REPORTS, GET_FRANCHISEE_REPORTS_FETCH_START} from "./franchisee.reports.action";

export const GET_FRANCHISEE_REPORT_DATA_LIST_START                          = "[FRANCHISEE REPORT DATA LIST] GETS START";
export const GET_FRANCHISEE_REPORT_DATA_LIST_SUCCESS                        = "[FRANCHISEE REPORT DATA LIST] GETS SUCCESS";
export const GET_FRANCHISEE_REPORT_DATA_LIST_FAILED                         = "[FRANCHISEE REPORT DATA LIST] GETS FAILED";



export function getFranchiseeReportDatalist() {
    return (dispatch) => {

        dispatch({
            type: GET_FRANCHISEE_REPORT_DATA_LIST_START,
            payload: true
        });

        (async () => {
            let res = await franchiseeReportService.getFranchiseeReportData();
            if (res._id) {
                dispatch({
                    type: GET_FRANCHISEE_REPORT_DATA_LIST_SUCCESS,
                    payload: res
                });
            } else {
                dispatch({
                    type: GET_FRANCHISEE_REPORT_DATA_LIST_FAILED,
                    payload: res
                });
            }
        })();
    };
}