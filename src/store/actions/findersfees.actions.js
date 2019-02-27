import axios from "axios";
import {findersFeesService} from "services";

export const GET_ALL_FINDERSFEES = "[FINDERSFEES] GETS ALL";
export const GET_FINDERSFEES_FETCH_START = "[FINDERSFEES] GET FINDERSFEES FETCH START";
export const DELETE_SELECTED_FINDERSFEES = "[FINDERSFEES] DELETE SELECTED";
export const REMOVE_SELECTED_FINDERSFEE = "[FINDERSFEE] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[FINDERSFEES] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[FINDERSFEES] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[FINDERSFEES] TOGGLE FILTER PANEL";
export const TOGGLE_MAP_VIEW = '[FINDERSFEES] TOGGLE MAP VIEW';

// for Add/Edit
export const OPEN_NEW_FINDERSFEE_FORM = '[FINDERSFEES APP] OPEN NEW FINDERSFEE FORM';
export const CLOSE_NEW_FINDERSFEE_FORM = '[FINDERSFEES APP] CLOSE NEW FINDERSFEE FORM';
export const OPEN_EDIT_FINDERSFEE_FORM = '[FINDERSFEES APP] OPEN EDIT FINDERSFEE FORM';
export const CLOSE_EDIT_FINDERSFEE_FORM = '[FINDERSFEES APP] CLOSE EDIT FINDERSFEE FORM';
export const ADD_FINDERSFEE = '[FINDERSFEES APP] ADD FINDERSFEE';
export const UPDATE_FINDERSFEE = '[FINDERSFEES APP] UPDATE FINDERSFEE';

// export function getFindersFees() {
//     return dispatch => {
//         const request = axios.post("/api/findersFees/post");

//         return request.then(response => {
//             return dispatch({
//                 type: GET_ALL_FINDERSFEES,
//                 payload: response.data
//             });
//         });
//     };
// }


const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});


export function getFindersFees(RegionId, StatusId, SearchText) {
    return (dispatch) => {

        dispatch({
            type: GET_FINDERSFEES_FETCH_START,
            payload: true
        });

        (async () => {
            let findersFeesList = await findersFeesService.getFindersFeeList(RegionId, StatusId, SearchText);
            dispatch({
                type: GET_ALL_FINDERSFEES,
                payload: findersFeesList
            });
        })();
    }
}

// alternative fetch method
// fetch('https://apifmsplus.jkdev.com/v1/franchisee/FindersFeesList', {
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

export function deleteFindersFees(keys, findersFees) {
    return dispatch => {
        const request = axios.post("/api/findersFees/delete", { ids: keys, findersFees: findersFees });

        return request.then(response => {
            return dispatch({
                type: DELETE_SELECTED_FINDERSFEES,
                payload: response.data
            });
        });
    };
}

export function removeFindersFee(key, findersFees) {
    return dispatch => {
        const request = axios.post("/api/findersFees/remove", { id: key, findersFees: findersFees });

        return request.then(response => {
            return dispatch({
                type: REMOVE_SELECTED_FINDERSFEE,
                payload: response.data
            });
        });
    };
}

export function openNewFindersFeesForm()
{
    return {
        type: OPEN_NEW_FINDERSFEE_FORM
    }
}

export function closeNewFindersFeesForm()
{
    return {
        type: CLOSE_NEW_FINDERSFEE_FORM
    }
}

export function openEditFindersFeesForm(data)
{
    return {
        type: OPEN_EDIT_FINDERSFEE_FORM,
        data
    }
}

export function closeEditFindersFeesForm()
{
    return {
        type: CLOSE_EDIT_FINDERSFEE_FORM
    }
}
export function addFindersFee(newFindersFee)
{
    return (dispatch, getState) => {

        console.log('state', getState());

        // const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/add-contact', {
            newFindersFee
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_FINDERSFEE
                })
            ]).then(() => dispatch(getFindersFees()))
        );
    };
}

export function updateFindersFeeStatus(findersFee)
{
    return (dispatch, getState) => {

        // const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/update-contact', {
            findersFee
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_FINDERSFEE
                })
            ]).then(() => dispatch(getFindersFees()))
        );
    };
}
