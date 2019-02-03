import axios from 'axios/index';
import {userService} from "../../../../services/index";

export const OPEN_USERS_FORM = '[USERS APP] OPEN USERS FORM';
export const UPDATE_USER_SELECT_ROWS = '[USERS APP] UPDATE USER SELECT ROWS';
export const TOGGLE_USERS_FILTER_PANEL = '[USERS APP] TOGGLE USERS FILTER_PANEL';
export const GET_USER_FORM_GROUP_LIST = '[USERS APP] GET USER FORM GROUP LIST';
export const GET_USER_FORM_ROLE_LIST ='[USERS APP] GET USER FORM ROLE LIST';
export const GET_USER_FORM_USERTYPE_LIST = '[USERS APP] GET USER FORM USERTYPE LIST';



// GET USER FORM GROUP LIST

export function getUserFormGroupList() {
    return (dispatch) => {
        (async () => {
            let res = await userService.getUserFormGroupList();
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_FORM_GROUP_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}


//GET USER FORM ROLE LIST

export function getUserFormRoleList() {
    return (dispatch) => {
        (async () => {
            let res = await userService.getUserFormRoleList();
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_FORM_ROLE_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}


//GET USER FORM USER_TYPE LIST

export function getUserFormUserTypeList() {
    return (dispatch) => {
        (async () => {
            let res = await userService.getUserFormUserTypeList();
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_FORM_USERTYPE_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}


export function openUsersForm(openForm) {
    console.log("open-Form", openForm);
    return {
        type: OPEN_USERS_FORM,
        payload: openForm
    }
}

export function updateSelectRows (row){
    return{
        type: UPDATE_USER_SELECT_ROWS,
        payload: row
    }
}

export function toggleUsersFilterPanel() {
    return{
        type: TOGGLE_USERS_FILTER_PANEL
    }
}