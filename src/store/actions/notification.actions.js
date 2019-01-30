import axios from "axios";
import {notificationService} from "../../services";

export const GET_ALL_SYSTEM_NOTIFICATION_START              = "[SYSTEM NOTIFICATION] GET ALL NOTIFICATION START";
export const GET_ALL_SYSTEM_NOTIFICATION_SUCCESS            = "[SYSTEM NOTIFICATION] GET ALL NOTIFICATION SUCCESS";
export const GET_ALL_SYSTEM_NOTIFICATION_FAILD              = "[SYSTEM NOTIFICATION] GET ALL NOTIFICATION FAILD";


export const ADD_NOTIFICATION_START              = "[PUSHER NOTIFICATION] ADD NOTIFICATION START";
export const ADD_NOTIFICATION_SUCCESS            = "[PUSHER NOTIFICATION] ADD NOTIFICATION SUCCESS";
export const ADD_NOTIFICATION_FAILD              = "[PUSHER NOTIFICATION] ADD NOTIFICATION FAILD";

export const ADMIN_VERSION_UPGRADE_TRIGGER_START              = "[PUSHER NOTIFICATION] ADMIN VERSION UPGRADE TRIGER START";
export const ADMIN_VERSION_UPGRADE_TRIGGER_SUCCESS            = "[PUSHER NOTIFICATION] ADMIN VERSION UPGRADE TRIGER SUCCESS";
export const ADMIN_VERSION_UPGRADE_TRIGGER_FAILD              = "[PUSHER NOTIFICATION] ADMIN VERSION UPGRADE TRIGER FAILD";


export function getallsystemnotification(UserId="65") {
    return (dispatch) => {

        dispatch({
            type: GET_ALL_SYSTEM_NOTIFICATION_START,
            payload: true
        });

        (async () => {
            let res = await notificationService.getallsystemnotification(UserId);
            if (res.IsSuccess) {
                dispatch({
                    type: GET_ALL_SYSTEM_NOTIFICATION_SUCCESS,
                    payload: res.Data
                });
            } else {
                dispatch({
                    type: GET_ALL_SYSTEM_NOTIFICATION_FAILD,
                    payload: res
                });
            }
        })();
    };
}

export function addnotification(pusherMSG) {
    return (dispatch) => {

        // dispatch({
        //     type: ADD_NOTIFICATION_START,
        //     payload: true
        // });
        dispatch({
            type: ADD_NOTIFICATION_SUCCESS,
            payload: pusherMSG
        });
        // dispatch({
        //     type: ADD_NOTIFICATION_FAILD,
        //     payload: res
        // });

    };
}
export function adminversionupgradetrigger(data) {
    return (dispatch) => {

        dispatch({
            type: ADMIN_VERSION_UPGRADE_TRIGGER_START,
            payload: true
        });
        (async () => {
            let res = await notificationService.adminversionupgradetrigger(data);
            if (res.IsSuccess) {
                dispatch({
                    type: ADMIN_VERSION_UPGRADE_TRIGGER_SUCCESS,
                    payload: res.Data
                });
            } else {
                dispatch({
                    type: ADMIN_VERSION_UPGRADE_TRIGGER_FAILD,
                    payload: res
                });
            }
        })();


    };
}