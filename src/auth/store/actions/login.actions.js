import {authSignin} from "../../../services/services";
import React from "react";
import {Redirect} from "react-router-dom";

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const CHANGE_REGION_ID = 'CHANGE_REGION_ID';

export const signinUser = (email, password) => {
    return (dispatch) => {
        (async () => {
            let res = await authSignin(email, password);
            if (res.IsSuccess) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res
                });
            }
        })();
    }
};
export const changeRegionId = (id)=>{
    return (dispatch) => {
        dispatch({
            type: CHANGE_REGION_ID,
            payload: id
        });
    }
};
