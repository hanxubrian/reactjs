// import {authSignin} from "../../../services/services";
import authService from '../../../services';
import React from "react";

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SEND_LOGOUT = 'SEND_LOGOUT';
export const CHANGE_REGION_ID = 'CHANGE_REGION_ID';
export const LOGIN_START = 'LOGIN_START';
export const CLOSE_ALERT_DIALOG = 'CLOSE_ALERT_DIALOG';

export function submitSignIn(email, password)  {
    return (dispatch) => {
        dispatch({
            type: LOGIN_START,
            payload: true
        });
        (async () => {
            let res = await authService.authSignin1(email, password);
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
