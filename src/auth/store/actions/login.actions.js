// import {authSignin} from "../../../services/services";
import authService from '../../../services';
import React from "react";

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SEND_LOGOUT = 'SEND_LOGOUT';
export const CHANGE_REGION_ID = 'CHANGE_REGION_ID';
export const LOGIN_START = 'LOGIN_START';
export const CLOSE_ALERT_DIALOG = 'CLOSE_ALERT_DIALOG';
export const INITIALIZE_FROM_LOCAL = 'INITIALZE_FROM_LOCAL';

export function submitSignIn(email, password)  {
    return (dispatch) => {
        dispatch({
            type: LOGIN_START,
            payload: true
        });
        (async () => {
            let res = await authService.authSignin(email, password);
            if (res.IsSuccess) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res
                });
            } else {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: res.Message
                })
            }
        })();
    }
}

export function changeRegionId (id){
    return (dispatch) => {
        dispatch({
            type: CHANGE_REGION_ID,
            payload: id
        });
    }
}

export function signOut () {
    authService.logout();
    return (dispatch) => {
        dispatch({
            type: SEND_LOGOUT
        });
    }
}

export function closeDialog() {
    return (dispatch) => {
        dispatch({
            type: CLOSE_ALERT_DIALOG
        });
    }
}


export function initializeFromLocalStorage() {
    let localData = {
        IsSuccess: true,
        UserId: localStorage.getItem('jk_user_id'),
        apiKey: localStorage.getItem('jk_ApiKey'),
        token: localStorage.getItem('jk_Token'),
        all_regions: JSON.parse(localStorage.getItem('jk_regions')),
        defaultRegionId: localStorage.getItem('jk_DefaultRegionId'),
        bLoginStart: false
    };


    console.log('localData=', localData)


    return (dispatch) => {
        dispatch({
            type: INITIALIZE_FROM_LOCAL,
            payload: localData
        });
    }
}
