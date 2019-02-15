import {userService, menuService} from "../../../../services/index";

export const OPEN_USERS_FORM = '[USERS APP] OPEN USERS FORM';
export const UPDATE_USER_SELECT_ROWS = '[USERS APP] UPDATE USER SELECT ROWS';
export const TOGGLE_USERS_FILTER_PANEL = '[USERS APP] TOGGLE USERS FILTER_PANEL';
export const GET_USER_FORM_GROUP_LIST = '[USERS APP] GET USER FORM GROUP LIST';
export const GET_USER_FORM_ROLE_LIST ='[USERS APP] GET USER FORM ROLE LIST';
export const GET_USER_FORM_USERTYPE_LIST = '[USERS APP] GET USER FORM USERTYPE LIST';
export const GET_USER_FORM_STATE_LIST ='[USERS APP] GET USER FORM STATE LIST';
export const GET_USER_FORM_DEPARTMENT_LIST = '[USERS APP] GET USER FORM DEPARTMENT LIST';
export const GET_USER_FORM_PERMISSION_LIST = '[USERS APP] GET USER FORM PERMISSION LIST';
export const GET_USER_FORM_VARIABLE = '[USERS APP] UPDATE USER FORM VARIABLE';

export const GET_USERS_LIST = '[USERS APP] GET USERS LIST';
export const CREATE_USER = '[USERS APP] CREATE USER';
export const GET_USER_DETAIL = '[USERS APP] GET USER DETAIL';
export const UPDATE_USER = '[USERS APP] UPDATE USER';
export const DELETE_USER = '[USERS APP] DELETE USER';
export const UPDATE_NEW_USER_AVATAR = '[USERS APP] UPDATE NEW USER AVATAR';
export const SET_NEW_USER_AVATAR_URL = '[USERS APP] SET NEW USER AVATAR URL';
export const GET_USER_MENU_OPTIONS = '[USERS APP] GET USER MENU OPTIONS';

// GET USERS LIST

export function getUsersList(regionId,groups,roles,searchText) {

    return (dispatch) => {
        (async () => {
            let res = await userService.getUsersList(regionId,groups,roles,searchText);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USERS_LIST,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}


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

export function openUsersForm(openForm, bNewForm=true) {
    console.log("open-Form", openForm);
    return {
        type: OPEN_USERS_FORM,
        payload: {openForm, bNewForm}
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

// UPDATE USER FORM VARIABLE

export function updateUserFormVariable(newPayload) {
    return{
        type: GET_USER_FORM_VARIABLE,
        payload: newPayload
    }
}


export function updateNewUserAvatar(file) {
    return{
        type: UPDATE_NEW_USER_AVATAR,
        payload: file
    }
}

export function setNewUserAvatarURL(url) {
    return{
        type: SET_NEW_USER_AVATAR_URL,
        payload: url
    }
}

/**
 * get User detail from id
 * @param userId
 * @returns {Function}
 */
export function getUserDetail(userId) {
    return (dispatch) => {
        (async () => {
            let res = await userService.getUserDetail(userId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_DETAIL,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}

export function getUserMenuOptions(appId, userId) {
    return (dispatch) => {
        (async () => {
            let res = await menuService.getUserMenuOptions(appId, userId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_USER_MENU_OPTIONS,
                    payload: res.Data
                });
            } else {

            }
        })();
    };
}
