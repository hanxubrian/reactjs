import axios from 'axios/index';

export const OPEN_USERS_FORM = '[USERS APP] OPEN USERS FORM';
export const UPDATE_USER_SELECT_ROWS = '[USERS APP] UPDATE USER SELECT ROWS';
export const TOGGLE_USERS_FILTER_PANEL = '[USERS APP] TOGGLE USERS FILTER_PANEL';

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