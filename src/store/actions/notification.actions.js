import axios from "axios";
import {notificationService} from "../../services";

export const GET_ALL_SYSTEM_NOTIFICATION_START              = "[SYSTEM NOTIFICATION] GET ALL NOTIFICATION START";
export const GET_ALL_SYSTEM_NOTIFICATION_SUCCESS            = "[SYSTEM NOTIFICATION] GET ALL NOTIFICATION SUCCESS";
export const GET_ALL_SYSTEM_NOTIFICATION_FAILD              = "[SYSTEM NOTIFICATION] GET ALL NOTIFICATION FAILD";

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