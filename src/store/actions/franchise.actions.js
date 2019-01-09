import axios from "axios";
import {franchiseesService} from "services";

export const GET_ALL_FRANCHISEES = "[FRANCHISEES] GETS ALL";
export const DELETE_SELECTED_FRANCHISEES = "[FRANCHISEES] DELETE SELECTED";
export const REMOVE_SELECTED_FRANCHISEES = "[FRANCHISEES] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL_FRANCHISEES = "[FRANCHISEES] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_PANEL_FRANCHISEES = "[FRANCHISEES] TOGGLE FILTER PANEL";
export const CREATE_FRANCHISEES_LIST = "[FRANCHISEES] FRANCHISEES CREATE OPEN";
export const CLOSE_CREATE_FRANCHISEES = "[FRANCHISEES] FRANCHISEES CREATE CLOSE";
export const OPEN_EDIT_FRANCHISEES_FORM = "[FRANCHISEES] FRANCHISEES EDIT OPEN";
export const CLOSE_EDIT_FRANCHISEES_FORM = "[FRANCHISEES] FRANCHISEES EDIT CLOSE";
export const UPDATE_FRANCHISEES = '[FRANCHISEES] UPDATE FRANCHISEES';
export const ADD_FRANCHISEES = '[FRANCHISEES] ADD FRANCHISEES';
export const TOGGLE_FRANCHISEE_MAP_VIEW = '[FRANCHISEES] TOGGLE FRANCHISEE MAP VIEW';
export const SELECTED_LOCATION = '[FRANCHISEES] SELECTED LOCATION';
export const GET_FILTER_LIST = '[FRANCHISEES] GET FILTER LIST';
export const UPDATE_FRANCHISEE_STATUS = '[FRANCHISEES] UPDATE FRANCHISEE STATUS';
export const UPDATE_DATE_SIGN_FRANCHISEE = "[FRANCHISEE] UPDATE  DATE_SIGN FRANCHISEE";
export const UPDATE_RENEW_DATE_FRANCHISEE = "[FRANCHISEE] UPDATE  RENEW_DATE FRANCHISEE";
export const UPDATE_EXP_DATE_FRANCHISEE = "[FRANCHISEE] UPDATE  EXP_DATE FRANCHISEE";
export const GET_FRANCHISEES_FETCH_START = "[FRANCHISEE] GET FRANCHISEES FETCH START";
export const GET_FRANCHISEE_FORM_PLAN_TYPE = "[FRANCHISEE] GET FRANCHISEES FORM PLAN TYPE";

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

export function getStatusFilterList(regionId) {
    return (dispatch) => {
        (async () => {
            let filterList = await franchiseesService.getStatusFilterList(regionId);
            dispatch({
                type: GET_FILTER_LIST,
                payload: filterList.Data
            });
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

export function deleteFranchisees(keys, franchisees) {
    return dispatch => {
        const request = axios.post("/api/franchisees/delete", { ids: keys, franchisees: franchisees });

        return request.then(response => {
            return dispatch({
                type: DELETE_SELECTED_FRANCHISEES,
                payload: response.data
            });
        });
    };
}

export function removeFranchisees(key, franchisees) {
    return dispatch => {
        const request = axios.post("/api/franchisees/remove", { id: key, franchisees: franchisees });

        return request.then(response => {
            return dispatch({
                type: REMOVE_SELECTED_FRANCHISEES,
                payload: response.data
            });
        });
    };
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

export function updateFranchisees(franchisees)
{
    return (dispatch, getState) => {

        // const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/franchisees/update-franchisees', {
            franchisees
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_FRANCHISEES
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

export function selectLocation(location){
    return {
        type: SELECTED_LOCATION,
        Location: location
    }
}
export function updateFranchiseeStatus(newStatus){
    return {
        type: UPDATE_FRANCHISEE_STATUS,
        payload: newStatus
    }
}
export function updateDate(key, date) {
    return {
        type: key,
        payload: date
    }

}