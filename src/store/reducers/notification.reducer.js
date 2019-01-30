import moment from "moment"

import * as Actions from "../actions";

import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
    notificationDB              : null,
    systnotification            : null,
    status                      : false,
    pusherMSGDB                 : [],
    adminversiontriggerstatus   : false,
}

const notification = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_SYSTEM_NOTIFICATION_START:
        {
            return {
                ...state,status:true,
            }
        }
        case Actions.GET_ALL_SYSTEM_NOTIFICATION_SUCCESS:
        {
            return {
                ...state, systnotification: action.payload,status:false,
            }
        }
        case Actions.GET_ALL_SYSTEM_NOTIFICATION_FAILD:
        {
            return {
                ...state, status:false,
            }
        }
        case Actions.ADD_NOTIFICATION_SUCCESS:
        {
            const MSG = action.payload;
            return{
                ...state,pusherMSGDB:[MSG,...state.pusherMSGDB],
            }
        }
        case Actions.ADMIN_VERSION_UPGRADE_TRIGGER_SUCCESS:
        {
            return {
                adminversiontriggerstatus:true,
            }
        }
        case Actions.ADMIN_VERSION_UPGRADE_TRIGGER_FAILD:
        {
            return {
                adminversiontriggerstatus:false,
            }
        }
        default:
        {
            return state;
        }
    }
};
const persistConfig = {
    key: 'notification',
    storage: storage,
};
export default persistReducer(persistConfig, notification);