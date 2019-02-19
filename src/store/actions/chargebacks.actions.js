import axios from "axios";
import {chargebackService} from "services";

export const GET_ALL_CHARGEBACKS = "[CHARGEBACKS] GETS ALL";
export const GET_CHARGEBACKS_FETCH_START = "[CHARGEBACKS] GET CHARGEBACKS FETCH START";
export const GET_CHARGEBACK_STATUS = "[CHARGEBACKS] GETS CHARGEBACK STATUS";
export const GET_CHARGEBACK_DETAIL = "[CHARGEBACKS] GETS CHARGEBACK DETAIL";
export const DELETE_SELECTED_CHARGEBACKS = "[CHARGEBACKS] DELETE SELECTED";
export const REMOVE_SELECTED_CHARGEBACK = "[CHARGEBACK] REMOVE SELECTED";
export const TOGGLE_SUMMARY_PANEL = "[CHARGEBACKS] TOGGLE SUMMARY PANEL";
export const TOGGLE_FILTER_STATUS = "[CHARGEBACKS] TOGGLE FILTER STATUS";
export const TOGGLE_FILTER_PANEL = "[CHARGEBACKS] TOGGLE FILTER PANEL";
export const TOGGLE_MAP_VIEW = '[CHARGEBACKS] TOGGLE MAP VIEW';
export const RESET_CHARGEBACK_FORM = "[CHARGEBACKS] RESET CHARGEBACK FORM";
export const STARTING_SAVE_CHARGEBACK_FORM_DATA = "[CHARGEBACKS] STARTING SAVE CHARGEBACK FORM DATA";
export const SELECT_TRANSACTION_FRANCHISEE = '[FRANCHISEE-TRANSACTION] SELECT TRANSACTION FRANCHISEE';
export const UPDATE_A_CHARGEBACK = "[CHARGEBACKS] GET A CHARGEBACK";
export const APPLY_SEARCH_TEXT_ARP = "[ARP] APPLY_SEARCH_TEXT_ARP";
export const SHOW_PROCESS_MODAL_FORM = "[CHARGEBACKS APP] SHOW_PROCESS_MODAL_FORM";

// for Add/Edit
export const OPEN_NEW_CHARGEBACK_FORM = '[CHARGEBACKS APP] OPEN NEW CHARGEBACK FORM';
export const CLOSE_NEW_CHARGEBACK_FORM = '[CHARGEBACKS APP] CLOSE NEW CHARGEBACK FORM';
export const OPEN_EDIT_CHARGEBACK_FORM = '[CHARGEBACKS APP] OPEN EDIT CHARGEBACK FORM';
export const CLOSE_EDIT_CHARGEBACK_FORM = '[CHARGEBACKS APP] CLOSE EDIT CHARGEBACK FORM';
export const ADD_CHARGEBACK = '[CHARGEBACKS APP] ADD CHARGEBACK';
export const UPDATE_CHARGEBACK = '[CHARGEBACKS APP] UPDATE CHARGEBACK';
export const UPDATED_CHARGEBACKS = '[CHARGEBACKS APP] UPDATED CHARGEBACKS';
export const UPDATE_CHARGEBACK_STATUS = '[CHARGEBACKS APP] UPDATE CHARGEBACK STATUS';
export const UPDATE_CHARGEBACK_DATE_OPTION = '[CHARGEBACKS APP] UPDATE CHARGEBACK DATE OPTION';


const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

// alternative fetch method
// export function getChargebacks() {
//     const data = {
//         'RegionId': [2,24],
//         'TransactionStatusId': [21,24],
//         'SearchText': '',
//     };

//     return dispatch => {
//         const request = axios_instance.post("https://apifmsplus.jkdev.com/v1/franchisee/ChargebackList", data);
//         return request.then(response => {
//             return dispatch({
//                 type: GET_ALL_CHARGEBACKS,
//                 payload: response.data
//             });
//         });
//     };
// }

// alternative fetch method
// fetch('https://apifmsplus.jkdev.com/v1/franchisee/ChargebackList', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"RegionId":[2,24], "TransactionStatusId":[21,24], "SearchText": ""})
//   }).then(res => res.json())
// .then(data => console.log(data))


export function getChargebacks(regionId, month, year) {

    regionId = regionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : regionId;

    return (dispatch) => {
        dispatch({
            type: GET_CHARGEBACKS_FETCH_START,
            payload: true
        });

        (async () => {
            let res = await chargebackService.getChargebackList(regionId, month, year);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_ALL_CHARGEBACKS,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function getChargebackDetail() {
    return (dispatch) => {
       (async () => {
            let res = await chargebackService.getChargebackDetailList();
            if (res) {
                dispatch({
                    type: GET_CHARGEBACK_DETAIL,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function getChargebackStatus(RegionId) {
    return (dispatch) => {
       (async () => {
            let res = await chargebackService.getChargebackStatusList(RegionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_CHARGEBACK_STATUS,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function showProcessModalForm(visible) {
	return {
		type: SHOW_PROCESS_MODAL_FORM,
		payload: visible
	}
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

export function deleteChargebacks(keys, chargebacks) {
    return dispatch => {
        const request = axios.post("/api/chargebacks/delete", { ids: keys, chargebacks: chargebacks });

        return request.then(response => {
            return dispatch({
                type: DELETE_SELECTED_CHARGEBACKS,
                payload: response.data
            });
        });
    };
}

export function removeChargeback(key, chargebacks) {
    return dispatch => {
        const request = axios.post("/api/chargebacks/remove", { id: key, chargebacks: chargebacks });

        return request.then(response => {
            return dispatch({
                type: REMOVE_SELECTED_CHARGEBACK,
                payload: response.data
            });
        });
    };
}

export function openNewChargebackForm()
{
    return {
        type: OPEN_NEW_CHARGEBACK_FORM
    }
}

export function closeNewChargebackForm()
{
    return {
        type: CLOSE_NEW_CHARGEBACK_FORM
    }
}

export function openEditChargebackForm(data)
{
return (dispatch) => {
    dispatch({
        type: GET_CHARGEBACKS_FETCH_START,
        payload: true
    });

    (async () => {
        let res = await chargebackService.getChargebackDetailList(data);
        if (res) {
            dispatch({
                type: GET_CHARGEBACK_DETAIL,
                payload: res
            });
            dispatch({
                type: OPEN_EDIT_CHARGEBACK_FORM,
            });
        } else {

        }
    })();
}
}

export function closeEditChargebackForm()
{
    return {
        type: CLOSE_EDIT_CHARGEBACK_FORM
    }
}
export function addChargeback(data)
{
    return (dispatch) => {
        // dispatch({
        //     type: GET_INVOICES_FETCH_START,
        //     payload: true
        // });

        (async () => {
            let res = await chargebackService.createNewChargeback(data);
            if (res.IsSuccess) {
                dispatch({
                    type: ADD_CHARGEBACK,
                    payload: res
                });
            } else {

            }
        })();
    };
}

export function updateChargeback(data) {
    return (dispatch) => {
        (async () => {
            let res = await chargebackService.updateChargeback(data);
            if (res.IsSuccess) {
                dispatch({
                    type: UPDATE_A_CHARGEBACK,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}
export function updatedChargebacks() {
    return {
        type: UPDATED_CHARGEBACKS,
    }
}


export function resetChargebackForm(){
    return (dispatch) => {

        dispatch({
            type: STARTING_SAVE_CHARGEBACK_FORM_DATA,
            payload: true
        });

        (async () => {
                dispatch({
                    type: RESET_CHARGEBACK_FORM,
                });
        })();
    };
}

export function selectFranchisee(obj) {
    return {
        type: SELECT_TRANSACTION_FRANCHISEE,
        payload: obj
    }
}

export function updateChargebackStatus(newStatus){
    return {
        type: UPDATE_CHARGEBACK_STATUS,
        payload: newStatus
    }
}

/**
 * updates chargeback date option index
 * @param option
 * @returns {{type: string, payload: *}}
 */
export function updateChargebackDateOption(option){
    return {
        type: UPDATE_CHARGEBACK_DATE_OPTION,
        payload: option
    }
}
