import axios from "axios";
import {franchiseesService} from "../../services";

export const GET_ALL_FRANCHISEES = "[FRANCHISEES] GETS ALL";
export const DELETE_SELECTED_FRANCHISEES = "[FRANCHISEES] DELETE SELECTED";
export const REMOVE_SELECTED_FRANCHISEES = "[FRANCHISEES] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL_FRANCHISEES = "[FRANCHISEES] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_PANEL_FRANCHISEES = "[FRANCHISEES] TOGGLE FILTER PANEL";
export const CREATE_FRANCHISEES_LIST = "[FRANCHISEES] FRANCHISEES CREATE OPEN";
export const CLOSE_CREATE_FRANCHISEES = "[FRANCHISEES] FRANCHISEES CREATE CLOSE";
export const OPEN_EDIT_FRANCHISEES_FORM = "[FRANCHISEES] FRANCHISEES EDIT OPEN";
export const CLOSE_EDIT_FRANCHISEES_FORM = "[FRANCHISEES] FRANCHISEES EDIT CLOSE";
export const ADD_FRANCHISEES = '[FRANCHISEES] ADD FRANCHISEES';
export const TOGGLE_FRANCHISEE_MAP_VIEW = '[FRANCHISEES] TOGGLE FRANCHISEE MAP VIEW';
export const GET_FILTER_LIST = '[FRANCHISEES] GET FILTER LIST';
export const UPDATE_FRANCHISEE_STATUS_ACTIVE = '[FRANCHISEES] UPDATE FRANCHISEE STATUS ACTIVE';
export const UPDATE_FRANCHISEE_STATUS_INACTIVE = '[FRANCHISEES] UPDATE FRANCHISEE STATUS INACTIVE';
export const UPDATE_DATE_SIGN_FRANCHISEE = "[FRANCHISEE] UPDATE  DATE_SIGN FRANCHISEE";
export const UPDATE_RENEW_DATE_FRANCHISEE = "[FRANCHISEE] UPDATE  RENEW_DATE FRANCHISEE";
export const UPDATE_EXP_DATE_FRANCHISEE = "[FRANCHISEE] UPDATE  EXP_DATE FRANCHISEE";
export const GET_FRANCHISEES_FETCH_START = "[FRANCHISEE] GET FRANCHISEES FETCH START";
export const GET_FRANCHISEE_FORM_PLAN_TYPE = "[FRANCHISEE] GET FRANCHISEES FORM PLAN TYPE";
export const GET_FRANCHISEE_DOCUMENTS_LIST = "[FRANCHISEE] GET FRANCHISEES DOCUMENT LIST";
export const GET_FRANCHISEE_FEE = "[FRANCHISEE] GET FRANCHISEES FEE MAINTENANCE";
export const FRANCHISEE_SELECT_LOCATION_FILTER = '[FRANCHISEE] FRANCHISEE SELECT LOCATION FILTER';
export const SELECTED_LOCATION = '[FRANCHISEES] SELECTED LOCATION';
export const UPLOAD_INSERT_PAYLOAD = '[FRANCHISEES] UPDATE INSERT PAYLOAD';
export const GET_FRANCHISEE_STATE_LIST = '[FRANCHISEES] GET FRANCHISEE STATE LIST';
export const UPDATE_FRANCHISEE_UPDATE_CHECKBOX = '[FRANCHISEES] UPDATE FRANCHISEE UPDATE CHECKBOX';

export const CREATE_FRANCHISEE = '[FRANCHISEES] CREATE FRANCHISEE';
export const UPDATE_FRANCHISEE = '[FRANCHISEES] UPDATE FRANCHISEE';
export const DELETE_FRANCHISEE = '[FRANCHISEES] DELETE FRANCHISEE';
export const GET_FRANCHISEE_DETAIL = '[FRANCHISEES] GET FRANCHISEE DETAIL';

export const UPDATE_REPORT_PERIOD = '[FRANCHISEES] UPDATE REPORT PERIOD';
export const NULLIFY_FRANCHISEE_NEW_REPORT = '[FINDERSFEES APP] NULLIFY FRANCHISEE NEW REPORT';

export const OPEN_CLOSE_DOC_SEND_ACTION_DIALOG = '[FRANCHISEES] OPEN CLOSE DOC SEND ACTION DIALOG ';
export const OPEN_CLOSE_DOC_VIEW_ACTION_DIALOG = '[FRANCHISEES] OPEN CLOSE DOC VIEW ACTION DIALOG ';


export function getFranchisees(regionId, statusId, location , latitude , longitude , searchtext) {

    regionId = regionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [regionId];

    return (dispatch) => {
        dispatch({
            type: GET_FRANCHISEES_FETCH_START,
            payload: true
        });

        (async () => {
            let franchiseesList = await franchiseesService.getFranchiseesList(regionId, statusId, location , latitude , longitude , searchtext);
            dispatch({
                type: GET_ALL_FRANCHISEES,
                payload: franchiseesList
            });
        })();
    }
}

export function createFranchisees(regionId,data) {

    return (dispatch) => {
        (async () => {
            let franchiseesList = await franchiseesService.createFranchiseesList(regionId, data);
            dispatch({
                type: CREATE_FRANCHISEE,
                payload: franchiseesList
            });
        })();
    }
}

export function updateFranchisees(id,regionId,data) {

    return (dispatch) => {
        (async () => {
            let franchiseesList = await franchiseesService.updateFranchiseesList(id,regionId,data);
            dispatch({
                type: UPDATE_FRANCHISEE,
                payload: franchiseesList
            });
        })();
    }
}

export function getFranchiseeDetail(id,regionId) {

    return (dispatch) => {
        (async () => {
            let franchiseesList = await franchiseesService.getFranchiseesDetail(id,regionId);
            if (franchiseesList.IsSuccess) {
                if(franchiseesList.Data.Fees === null){
                    franchiseesList.Data.Fees = [];
                }
                if(franchiseesList.Data.Documents === null){
                    franchiseesList.Data.Documents = [];
                }
                dispatch({
                    type: GET_FRANCHISEE_DETAIL,
                    payload: franchiseesList
                });
            }
        })();
    }
}

export function deleteFranchisees(id,regionId) {

    return (dispatch) => {
        (async () => {
            let franchiseesList = await franchiseesService.deleteFranchiseesList(id, regionId);
            dispatch({
                type: DELETE_FRANCHISEE,
                payload: franchiseesList
            });
        })();
    }
}

export function getStatusFilterList(regionId) {
    return (dispatch) => {
        (async () => {
            let filterList = await franchiseesService.getStatusFilterList(regionId);
            if (filterList.IsSuccess) {
                dispatch({
                    type: GET_FILTER_LIST,
                    payload: filterList.Data
                });
            } else {

            }
        })();
    }
}

export function getFranchiseeStateList() {
    return (dispatch) => {
        (async () => {
            let stateList = await franchiseesService.getFranchiseeStateList();
            if (stateList.IsSuccess) {
                dispatch({
                    type: GET_FRANCHISEE_STATE_LIST,
                    payload: stateList.Data
                });
            }
        })();
    }
}

export function getFranchiseeFormPlanType(regionId) {
    return (dispatch) => {
        (async () => {
            let planType = await franchiseesService.getFranchiseeFormPlanType(regionId);
            dispatch({
                type: GET_FRANCHISEE_FORM_PLAN_TYPE,
                payload:  planType
            });
        })();
    }
}
export function getFranchiseeDocumentsList(regionId) {
    return (dispatch) => {
        (async () => {
            let documentsList = await franchiseesService.getFranchiseeDocumentsList(regionId);
            if (documentsList.IsSuccess) {
                dispatch({
                    type: GET_FRANCHISEE_DOCUMENTS_LIST,
                    payload: documentsList.Data
                });
            }
        })();
    }
}

export function getFranchiseeFeeMaintenance(regionId) {
    return (dispatch) => {
        (async () => {
            let franchiseeFees = await franchiseesService.getFranchiseeFeeMaintenance(regionId);
            dispatch({
                type: GET_FRANCHISEE_FEE,
                payload:  franchiseeFees.Data
            });
        })();
    }
}

export function toggleFilterPanelFranchisees(){
    return {
        type: TOGGLE_FILTER_PANEL_FRANCHISEES
    }
}

export function toggleSummaryPanelFranchisees(){
    return {
        type: TOGGLE_SUMMARY_PANEL_FRANCHISEES
    }
}


export function showCreteFranchisees()
{
    return {
        type: CREATE_FRANCHISEES_LIST
    }
}

export function closeCreateFranchisees(data)
{
    return {
        type: CLOSE_CREATE_FRANCHISEES,
        data
    }
}

export function showEditFranchisees(data)
{
    return {
        type: OPEN_EDIT_FRANCHISEES_FORM,
        data
    }
}

export function closeEditFranchisees()
{
    return {
        type: CLOSE_EDIT_FRANCHISEES_FORM
    }
}

export function addFranchisees(newFranchisees)
{
    return (dispatch, getState) => {

        console.log('state', getState());

        // const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/franchisees/add-franchisees', {
            newFranchisees
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_FRANCHISEES
                })
            ]).then(() => dispatch(getFranchisees()))
        );
    };
}


export function toggleFranchiseeMapView(){
    return {
        type: TOGGLE_FRANCHISEE_MAP_VIEW
    }
}

export function updateFranchiseeStatusActive(newStatus){
    return {
        type: UPDATE_FRANCHISEE_STATUS_ACTIVE,
        payload: newStatus
    }
}

export function updateFranchiseeStatusInActive(newStatus){
    return {
        type: UPDATE_FRANCHISEE_STATUS_INACTIVE,
        payload: newStatus
    }
}

export function franchiseeFeeUpdateCheckbox (newStatus){
    return{
        type: UPDATE_FRANCHISEE_UPDATE_CHECKBOX,
        payload: newStatus
    }
}

export function franchiseeUpdateInsertPayload(newStatus){
    return {
        type: UPLOAD_INSERT_PAYLOAD,
        payload: newStatus
    }
}

export function updateDate(key, date) {
    return {
        type: key,
        payload: date
    }

}

export function franchiseeSelectLocationFilter(filter_value) {
    return {
        type: FRANCHISEE_SELECT_LOCATION_FILTER,
        payload: filter_value
    }
}

export function selectLocation(location){
     return {
       type: SELECTED_LOCATION,
        Location: location
     }
}


export function updateReportPeriod(period) {
    return {
        type: UPDATE_REPORT_PERIOD,
        payload: period
    }
}


export function nullifyFranchiseeNewReport() {
    return {
        type: NULLIFY_FRANCHISEE_NEW_REPORT,
    }
}

export function openCloseDocSendActionDialog (flag){
    return{
        type: OPEN_CLOSE_DOC_SEND_ACTION_DIALOG,
        payload: flag
    }
}
export function openCloseDocViewActionDialog (flag){
    return{
        type: OPEN_CLOSE_DOC_VIEW_ACTION_DIALOG,
        payload: flag
    }
}

