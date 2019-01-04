import axios from "axios";

export const GET_ALL_LEASES = "[LEASES] GETS ALL";
export const DELETE_SELECTED_LEASES = "[LEASES] DELETE SELECTED";
export const REMOVE_SELECTED_LEASE = "[LEASE] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[LEASES] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[LEASES] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[LEASES] TOGGLE FILTER PANEL";
export const TOGGLE_MAP_VIEW = '[LEASES] TOGGLE MAP VIEW';

// for Add/Edit
export const OPEN_NEW_LEASE_FORM = '[LEASES APP] OPEN NEW LEASE FORM';
export const CLOSE_NEW_LEASE_FORM = '[LEASES APP] CLOSE NEW LEASE FORM';
export const OPEN_EDIT_LEASE_FORM = '[LEASES APP] OPEN EDIT LEASE FORM';
export const CLOSE_EDIT_LEASE_FORM = '[LEASES APP] CLOSE EDIT LEASE FORM';
export const ADD_LEASE = '[LEASES APP] ADD LEASE';
export const UPDATE_LEASE = '[LEASES APP] UPDATE LEASE';

export function getLeases() {
    return dispatch => {
        const request = axios.get("/api/leases/gets");

        return request.then(response => {
            return dispatch({
                type: GET_ALL_LEASES,
                payload: response.data
            });
        });
    };
}

export function toggleFilterPanel(){
    return {
        type: TOGGLE_FILTER_PANEL
    }
}

export function toggleSummaryPanel(){
    return {
        type: TOGGLE_SUMMARY_PANEL
    }
}

export function toggleMapView(){
    return {
        type: TOGGLE_MAP_VIEW
    }
}
export function toggleStatus(key, status){
    return {
        type: TOGGLE_FILTER_STATUS,
        payload: {[key]: status}
    }
}

export function deleteLeases(keys, leases) {
    return dispatch => {
        const request = axios.post("/api/leases/delete", { ids: keys, leases: leases });

        return request.then(response => {
            return dispatch({
                type: DELETE_SELECTED_LEASES,
                payload: response.data
            });
        });
    };
}

export function removeLease(key, leases) {
    return dispatch => {
        const request = axios.post("/api/leases/remove", { id: key, leases: leases });

        return request.then(response => {
            return dispatch({
                type: REMOVE_SELECTED_LEASE,
                payload: response.data
            });
        });
    };
}

export function openNewLeaseForm()
{
    return {
        type: OPEN_NEW_LEASE_FORM
    }
}

export function closeNewLeaseForm()
{
    return {
        type: CLOSE_NEW_LEASE_FORM
    }
}

export function openEditLeaseForm(data)
{
    return {
        type: OPEN_EDIT_LEASE_FORM,
        data
    }
}

export function closeEditLeaseForm()
{
    return {
        type: CLOSE_EDIT_LEASE_FORM
    }
}
export function addLease(newLease)
{
    return (dispatch, getState) => {

        console.log('state', getState());

        // const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/add-contact', {
            newLease
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_LEASE
                })
            ]).then(() => dispatch(getLeases()))
        );
    };
}

export function updateLease(lease)
{
    return (dispatch, getState) => {

        // const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/update-contact', {
            lease
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_LEASE
                })
            ]).then(() => dispatch(getLeases()))
        );
    };
}
