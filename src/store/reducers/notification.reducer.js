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
    pusherMSGById               : null,
    loadingById                 : false,
    open                        : null
}

const notification = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_SYSTEM_NOTIFICATION_START:
        {
            return {
                ...state,status:true,
            }
        }
        case Actions.CLOSE_NOTIFICATION_DETAIL:
        {
            return {
                ...state,
                open: false
            };
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
            let pusherdb = state.pusherMSGDB;
           // pusherdb.unshift(MSG);
            return{
                ...state,
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
        case Actions.GET_SYSTEM_NOTIFICATION_BY_ID_START:
        {
            return{
                ...state,loadingById:true,pusherMSGById:null,open:true
            }
        }
        case Actions.GET_SYSTEM_NOTIFICATION_BY_ID_SUCCESS:
        {
            return{
                ...state,pusherMSGById:action.payload,loadingById:false,open:true
            }
        }
        case Actions.GET_SYSTEM_NOTIFICATION_BY_ID_FAILD:
        {
            return{
                ...state,loadingById:false,pusherMSGById:null,
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
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