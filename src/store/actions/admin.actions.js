import {adminImportNotificationService} from "../../services";

export const IMPORT_NOTIFICATION_START              = "[IMPORT NOTIFICATION] NOTIFICATION START";
export const IMPORT_NOTIFICATION_SUCCESS            = "[IMPORT NOTIFICATION] NOTIFICATION SUCCESS";
export const IMPORT_NOTIFICATION_FAILD              = "[IMPORT NOTIFICATION] NOTIFICATION FAILD";

export function getallimportlist(RegionId) {
    return (dispatch) => {

        dispatch({
            type: IMPORT_NOTIFICATION_START,
            payload: true
        });

        (async () => {
            let res = await adminImportNotificationService.getImportResultFromRegion(RegionId);
            if (res.IsSuccess) {
                dispatch({
                    type: IMPORT_NOTIFICATION_SUCCESS,
                    payload: res.Data
                });
            } else {
                dispatch({
                    type: IMPORT_NOTIFICATION_FAILD,
                    payload: res
                });
            }
        })();
    };
}