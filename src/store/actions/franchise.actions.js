import axios from "axios";

export const GET_ALL_FRANCHISEES = "[FRANCHISEES] GETS ALL";
export const DELETE_SELECTED_FRANCHISEES = "[FRANCHISEES] DELETE SELECTED";
export const REMOVE_SELECTED_FRANCHISEES = "[FRANCHISEES] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL_FRANCHISEES = "[FRANCHISEES] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS_FRANCHISEES = "[FRANCHISEES] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL_FRANCHISEES = "[FRANCHISEES] TOGGLE FILTER PANEL";
export const CREATE_FRANCHISEES_LIST = "[FRANCHISEES] FRANCHISEES CREATE OPEN";
export const CLOSE_CREATE_FRANCHISEES = "[FRANCHISEES] FRANCHISEES CREATE CLOSE";
export const OPEN_EDIT_FRANCHISEES_FORM = "[FRANCHISEES] FRANCHISEES EDIT OPEN";
export const CLOSE_EDIT_FRANCHISEES_FORM = "[FRANCHISEES] FRANCHISEES EDIT CLOSE";
export const UPDATE_FRANCHISEES = '[FRANCHISEES] UPDATE FRANCHISEES';
export const ADD_FRANCHISEES = '[FRANCHISEES] ADD FRANCHISEES';


export function getFranchisees() {
    return dispatch => {
        const request = axios.get("/api/franchisees/gets");

        return request.then(response => {
            return dispatch({
                type: GET_ALL_FRANCHISEES,
                payload: response.data
            });
        });
    };
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

export function toggleStatusFranchisees(key, status){
    return {
        type: TOGGLE_FILTER_STATUS_FRANCHISEES,
        payload: {[key]: status}
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