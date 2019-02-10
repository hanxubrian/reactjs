import axios from 'axios/index';
import {userService} from "../../../../services/index";

export const OPEN_USERS_FORM = '[USERS APP] OPEN USERS FORM';
export const UPDATE_USER_SELECT_ROWS = '[USERS APP] UPDATE USER SELECT ROWS';
export const TOGGLE_USERS_FILTER_PANEL = '[USERS APP] TOGGLE USERS FILTER_PANEL';
export const GET_USER_FORM_GROUP_LIST = '[USERS APP] GET USER FORM GROUP LIST';
export const GET_USER_FORM_ROLE_LIST ='[USERS APP] GET USER FORM ROLE LIST';
export const GET_USER_FORM_USERTYPE_LIST = '[USERS APP] GET USER FORM USERTYPE LIST';
export const GET_USER_FORM_STATE_LIST ='[USERS APP] GET USER FORM STATE LIST';
export const GET_USER_FORM_DEPARTMENT_LIST = '[USERS APP] GET USER FORM DEPARTMENT LIST';
export const GET_USER_FORM_PERMISSION_LIST = '[USERS APP] GET USER FORM PERMISSION LIST';

export const CREATE_USER = '[USERS APP] CREATE USER';
export const GET_USER_DETAIL = '[USERS APP] GET USER DETAIL';
export const UPDATE_USER = '[USERS APP] UPDATE USER';
export const DELETE_USER = '[USERS APP] DELETE USER';


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

// CREATE USER

export function createUser(data) {
    return (dispatch) => {
        (async () => {
            let res = await userService.createUser(data);
            if (res.IsSuccess) {
                dispatch({
                    type: CREATE_USER,
                    payload: res
                });
            } 
        })();
    };
}

// UPDATE USER

export function updateUser(id,data) {
    return (dispatch) => {
        (async () => {
            let res = await userService.createUser(id,data);
            if (res.IsSuccess) {
                dispatch({
                    type: UPDATE_USER,
                    payload: res
                });
            } 
        })();
    };
}

// DELETE USER

export function deleteUser(id) {
    return (dispatch) => {
        (async () => {
            let res = await userService.deleteUser(id);
            if (res.IsSuccess) {
                dispatch({
                    type: DELETE_USER,
                    payload: res
                });
            } 
        })();
    };
}

// GET USER DETAIL

export function getUserDetail(id) {
    return (dispatch) => {
        (async () => {
            let res = await userService.getUserDetail(id);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_DETAIL,
                    payload: res
                });
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



// GET USER FORM STATE LIST

export function getUserStateList() {
    return (dispatch) => {
        (async () => {
            let res = await userService.getUserStateList();
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_FORM_STATE_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}


// GET USER FORM STATE LIST

export function getUserDepartmentList(regionId) {
    return (dispatch) => {
        (async () => {
            let res = await userService.getUserDepartmentList(regionId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_FORM_DEPARTMENT_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}



// GET USER FORM STATE LIST

export function getUserPermissionList() {
    return (dispatch) => {
        (async () => {
            let res = await userService.getUserPermissionList();
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_FORM_PERMISSION_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}


// OPEN USER FORM STATUS

export function openUsersForm(openForm) {
    console.log("open-Form", openForm);
    return {
        type: OPEN_USERS_FORM,
        payload: openForm
    }
}



// UPDATE SELECT ROWS


export function updateSelectRows (row){
    return{
        type: UPDATE_USER_SELECT_ROWS,
        payload: row
    }
}




// TOGGLE USERS FILTER PANEL


export function toggleUsersFilterPanel() {
    return{
        type: TOGGLE_USERS_FILTER_PANEL
    }
}