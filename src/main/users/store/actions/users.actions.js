import axios from 'axios/index';

export const OPEN_USERS_FORM = '[USERS APP] OPEN USERS FORM';
export const UPDATE_SELECT_ROWS = '[USERS APP] UPDATE SELECT ROWS'

export function openUsersForm(openForm) {
    console.log("open-Form", openForm);
    return {
        type: OPEN_USERS_FORM,
        payload: openForm
    }
}

export function updateSelectRows (row){
    return{
        type: UPDATE_SELECT_ROWS,
        payload: row
    }
}