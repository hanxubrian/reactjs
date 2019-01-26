import axios from "axios";
import { customersService } from "services";

export const GET_ALL_VERIFICATIONS = "[VERIFICATIONS APP] GETS ALL";
export const TOGGLE_VERIFICATION_SUMMARY_PANEL = "[VERIFICATIONS APP] TOGGLE SUMMARY PANEL";
export const TOGGLE_VERIFICATION_FILTER_STATUS = "[VERIFICATIONS APP] TOGGLE VERIFICATION FILTER STATUS";
export const TOGGLE_VERIFICATION_FILTER_PANEL = "[VERIFICATIONS APP] TOGGLE VERIFICATION FILTER PANEL";
export const UPDATE_SELECTION_ROW_LENGTH = "[VERIFICATIONS APP] UPDATE VERIFICATION SELECTION ROWS LENGTH";
export const OPEN_VERIFICATION_DIALOG = "[VERIFICATIONS APP] OPEN VERIFICATION DIALOG ";
export const CLOSE_VERIFICATION_DIALOG = "[VERIFICATIONS APP] CLOSE VERIFICATION DIALOG ";

export const OPEN_CLOSE_REVISE_DIALOG = "[VERIFICATIONS APP] OPEN/CLOSE REVISE DIALOG ";
export const OPEN_CLOSE_REJECT_DIALOG = "[VERIFICATIONS APP] OPEN/CLOSE REJECT DIALOG ";

// for Add/Edit
export const OPEN_NEW_VERIFICATION_FORM = '[VERIFICATIONS APP] OPEN NEW CUSTOMER FORM';
export const CLOSE_NEW_VERIFICATION_FORM = '[VERIFICATIONS APP] CLOSE NEW CUSTOMER FORM';

export function getVerifications(regionId, statusId = 0, location = "all", latitude = "", longitude = "", searchText = "") {

    return (dispatch) => {
        (async () => {
            regionId = regionId === 0 ? [2, 7, 9, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 31, 46, 55, 64, 82] : [regionId]
            statusId = statusId === 0 ? Array.from({ length: 10 }).map((item, index) => (index + 1)) : [statusId]
            console.log(regionId, statusId)
            let response = await customersService.getCustomersList(regionId, statusId, location, latitude, longitude, searchText);
            dispatch({
                type: GET_ALL_VERIFICATIONS,
                payload: response
            });
        })();
    }
}


export function toggleVerificationFilterPanel() {
    return {
        type: TOGGLE_VERIFICATION_FILTER_PANEL
    }
}

export function toggleVerificationSummaryPanel() {
    return {
        type: TOGGLE_VERIFICATION_SUMMARY_PANEL
    }
}

export function toggleVerificationStatus(key, status) {
    return {
        type: TOGGLE_VERIFICATION_FILTER_STATUS,
        payload: { [key]: status }
    }
}


export function openNewVerificationForm() {
    return {
        type: OPEN_NEW_VERIFICATION_FORM
    }
}

export function closeNewVerificationForm() {
    return {
        type: CLOSE_NEW_VERIFICATION_FORM
    }
}

export function updateSelectedRowsLength(length) {
    return {
        type: UPDATE_SELECTION_ROW_LENGTH,
        payload: length
    }
}

export function openVerificationDialog(flag){
    if(flag){
        return{
            type: OPEN_VERIFICATION_DIALOG
        }
    }else {
        return{
            type: CLOSE_VERIFICATION_DIALOG
        }
    }

}

export function openCloseReviseDialog(flag){
    return{
        type: OPEN_CLOSE_REVISE_DIALOG,
        payload : flag
    }
}

export function openCloseRejectDialog(flag){
    return{
        type: OPEN_CLOSE_REJECT_DIALOG,
        payload : flag
    }
}