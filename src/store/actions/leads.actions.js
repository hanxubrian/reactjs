import axios from "axios";

export const GET_ALL_LEADS = "[LEADS] GETS ALL";
export const DELETE_SELECTED_LEADS = "[LEADS] DELETE SELECTED";
export const REMOVE_SELECTED_LEAD = "[LEAD] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[LEADS] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[LEADS] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[LEADS] TOGGLE FILTER PANEL";
export const TOGGLE_MAP_VIEW = '[LEADS] TOGGLE MAP VIEW';

// for Add/Edit
export const OPEN_NEW_LEAD_FORM = '[LEADS APP] OPEN NEW LEAD FORM';
export const CLOSE_NEW_LEAD_FORM = '[LEADS APP] CLOSE NEW LEAD FORM';
export const OPEN_EDIT_LEAD_FORM = '[LEADS APP] OPEN EDIT LEAD FORM';
export const CLOSE_EDIT_LEAD_FORM = '[LEADS APP] CLOSE EDIT LEAD FORM';
export const ADD_LEAD = '[LEADS APP] ADD LEAD';
export const UPDATE_LEAD = '[LEADS APP] UPDATE LEAD';
export const UPDATE_DRAW_STATUS = '[LEADS APP] UPDATE DRAW STATUS';

// export function getLeases() {
//     return dispatch => {
//         const request = axios.post("/api/leases/post");

//         return request.then(response => {
//             return dispatch({
//                 type: GET_ALL_LEASES,
//                 payload: response.data
//             });
//         });
//     };
// }


// const axios_instance = axios.create({
//     headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
//     withCredentials: false
// });


// export function getLeads() {

//     const data = {
//         'RegionId': [2,24],
//         'TransactionStatusId': [21,24],
//         'SearchText': '',
//     };

//     return dispatch => {
//         const request = axios_instance.get("");
//         return request.then(response => {
//             return dispatch({
//                 type: GET_ALL_LEADS,
//                 payload: response.data
//             });
//         });
//     };
// }

export function getLeads() {
    return dispatch => {
        const request = axios.get("/api/leads/gets");

        return request.then(response => {
            return dispatch({
                type: GET_ALL_LEADS,
                payload: response.data
            });
        });
    };
}


// alternative fetch method
// fetch('https://apifmsplus.jkdev.com/v1/franchisee/LeaseList', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"RegionId":[2,24], "TransactionStatusId":[21,24], "SearchText": ""})
//   }).then(res => res.json())
// .then(data => console.log(data))


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

export function deleteLeads(keys, leads) {
    return dispatch => {
        const request = axios.post("/api/leads/delete", { ids: keys, leads: leads });

        return request.then(response => {
            return dispatch({
                type: DELETE_SELECTED_LEADS,
                payload: response.data
            });
        });
    };
}

export function removeLead(key, leads) {
    return dispatch => {
        const request = axios.post("/api/leads/remove", { id: key, leads: leads });

        return request.then(response => {
            return dispatch({
                type: REMOVE_SELECTED_LEAD,
                payload: response.data
            });
        });
    };
}

export function openNewLeadForm()
{
    return {
        type: OPEN_NEW_LEAD_FORM
    }
}

export function closeNewLeadForm()
{
    return {
        type: CLOSE_NEW_LEAD_FORM
    }
}

export function openEditLeadForm(data)
{
    return {
        type: OPEN_EDIT_LEAD_FORM,
        data
    }
}

export function closeEditLeadForm()
{
    return {
        type: CLOSE_EDIT_LEAD_FORM
    }
}
export function addLead(newLead)
{
    return (dispatch, getState) => {

        console.log('state', getState());

        // const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/add-contact', {
            newLead
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_LEAD
                })
            ]).then(() => dispatch(getLeads()))
        );
    };
}

export function updateLease(lead)
{
    return (dispatch, getState) => {

        // const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/update-contact', {
            lead
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_LEAD
                })
            ]).then(() => dispatch(getLeads()))
        );
    };
}

export function updateDrawStatus (drawStatus){
    return{
        type: UPDATE_DRAW_STATUS,
        payload: drawStatus
    }
}