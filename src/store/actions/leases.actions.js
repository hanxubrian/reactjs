import axios from "axios";
import {leaseService} from "services";

export const GET_ALL_LEASES = "[LEASES] GETS ALL";
export const GET_LEASES_FETCH_START = "[LEASES] GET LEASES FETCH START";
export const GET_LEASE_STATUS = "[LEASES] GETS LEASE STATUS";
export const GET_LEASE_DETAIL = "[LEASES] GETS LEASE DETAIL";
export const DELETE_SELECTED_LEASES = "[LEASES] DELETE SELECTED";
export const REMOVE_SELECTED_LEASE = "[LEASE] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[LEASES] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[LEASES] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[LEASES] TOGGLE FILTER PANEL";
export const TOGGLE_MAP_VIEW = '[LEASES] TOGGLE MAP VIEW';
export const RESET_LEASE_FORM = "[LEASES] RESET LEASE FORM";
export const STARTING_SAVE_LEASE_FORM_DATA = "[LEASES] STARTING SAVE LEASE FORM DATA";
export const SELECT_TRANSACTION_FRANCHISEE = '[FRANCHISEE-TRANSACTION] SELECT TRANSACTION FRANCHISEE';
export const UPDATE_A_LEASE = "[LEASES] GET A LEASE";
export const APPLY_SEARCH_TEXT_ARP = "[ARP] APPLY_SEARCH_TEXT_ARP";
export const SELECT_LEASE = '[LEASES] SELECT LEASE';


// for Add/Edit
export const OPEN_NEW_LEASE_FORM = '[LEASES APP] OPEN NEW LEASE FORM';
export const CLOSE_NEW_LEASE_FORM = '[LEASES APP] CLOSE NEW LEASE FORM';
export const OPEN_EDIT_LEASE_FORM = '[LEASES APP] OPEN EDIT LEASE FORM';
export const CLOSE_EDIT_LEASE_FORM = '[LEASES APP] CLOSE EDIT LEASE FORM';
export const ADD_LEASE = '[LEASES APP] ADD LEASE';
export const UPDATE_LEASE = '[LEASES APP] UPDATE LEASE';
export const UPDATED_LEASES = '[LEASES APP] UPDATED LEASES';
export const UPDATE_LEASE_STATUS = '[LEASES APP] UPDATE LEASE STATUS';
export const UPDATE_LEASE_DATE_OPTION = '[LEASES APP] UPDATE LEASE DATE OPTION';
export const UPDATE_LEASE_LINE = '[LEASES APP] UPDATE LEASE LINE';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

// alternative fetch method
// export function getLeases() {
//     const data = {
//         'RegionId': [2,24],
//         'TransactionStatusId': [21,24],
//         'SearchText': '',
//     };

//     return dispatch => {
//         const request = axios_instance.post("https://apifmsplus.jkdev.com/v1/franchisee/LeaseList", data);
//         return request.then(response => {
//             return dispatch({
//                 type: GET_ALL_LEASES,
//                 payload: response.data
//             });
//         });
//     };
// }

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


export function getLeases(regionId, statusId, searchText) {

    regionId = regionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [regionId];

    return (dispatch) => {
        dispatch({
            type: GET_LEASES_FETCH_START,
            payload: true
        });

        (async () => {
            let res = await leaseService.getLeaseList(regionId, statusId, searchText);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_ALL_LEASES,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function getLeaseDetail() {
    return (dispatch) => {
       (async () => {
            let res = await leaseService.getLeaseDetailList();
            if (res) {
                dispatch({
                    type: GET_LEASE_DETAIL,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function getLeaseStatus(RegionId) {
    return (dispatch) => {
       (async () => {
            let res = await leaseService.getLeaseStatusList(RegionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_LEASE_STATUS,
                    payload: res.Data
                });
            } else {

            }
        })();
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

export function applySearchText_ARP(s) {
	return {
		type: APPLY_SEARCH_TEXT_ARP,
		payload: s
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

export function openEditLeaseForm(leaseId, regionId)
{
return (dispatch) => {
    dispatch({
        type: GET_LEASES_FETCH_START,
        payload: true
    });

    (async () => {
        let res = await leaseService.getLeaseDetailList(leaseId, regionId);
        if (res) {
            dispatch({
                type: GET_LEASE_DETAIL,
                payload: res
            });
            dispatch({
                type: OPEN_EDIT_LEASE_FORM,
            });
        } else {

        }
    })();
}
}

export function closeEditLeaseForm()
{
    return {
        type: CLOSE_EDIT_LEASE_FORM
    }
}
export function addLease(data)
{
    return (dispatch) => {
        // dispatch({
        //     type: GET_INVOICES_FETCH_START,
        //     payload: true
        // });

        (async () => {
            let res = await leaseService.createNewLease(data);
            if (res.IsSuccess) {
                dispatch({
                    type: ADD_LEASE,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function updateLease(regionId, id, data) {
    return (dispatch) => {
        (async () => {
            let res = await leaseService.updateLease(regionId, id, data);
            if (res.IsSuccess) {
                dispatch({
                    type: UPDATE_A_LEASE,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function updateLeaseLine(data) {
    return {
        type: UPDATE_LEASE_LINE,
        payload: data
    }
}

export function updatedLeases() {
    return {
        type: UPDATED_LEASES,
    }
}


export function resetLeaseForm(){
    return (dispatch) => {

        dispatch({
            type: STARTING_SAVE_LEASE_FORM_DATA,
            payload: true
        });

        (async () => {
                dispatch({
                    type: RESET_LEASE_FORM,
                });
        })();
    };
}

export function selectFranchisee(obj) {
    return {
        type: SELECT_LEASE,
        payload: obj
    }
}

export function selectLease(obj) {
    return {
        type: SELECT_LEASE,
        payload: obj
    }
}

export function updateLeaseStatus(newStatus){
    return {
        type: UPDATE_LEASE_STATUS,
        payload: newStatus
    }
}

/**
 * updates lease date option index
 * @param option
 * @returns {{type: string, payload: *}}
 */
export function updateLeaseDateOption(option){
    return {
        type: UPDATE_LEASE_DATE_OPTION,
        payload: option
    }
}
