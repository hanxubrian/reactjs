import * as Actions from "../actions";

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
    PAYMENT_LOCKBOX_GET_ALL_DATA_FAILD,
    PAYMENT_LOCKBOX_GET_ALL_DATA_START,
    PAYMENT_LOCKBOX_GET_ALL_DATA_SUCCESS
} from "../actions/paymentlockbox.action";
import * as UserActions from "../../auth/store/actions";

const initialState = {
    paymentlockboxDB        : null,
    data                    : null,
    getallstatus            : false,
};

const paymentlockbox = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.PAYMENT_LOCKBOX_GET_ALL_DATA_START:
            return {...state, getallstatus: true}
        case Actions.PAYMENT_LOCKBOX_GET_ALL_DATA_SUCCESS:
            return {...state,data:action.payload, getallstatus: false}
        case Actions.PAYMENT_LOCKBOX_GET_ALL_DATA_FAILD:
            return {...state, getallstatus: false}
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        default:
            return state;
    }
};
const persistConfig = {
    key         : 'paymentlockbox',
    storage     : storage,
};
// export default dashboard;
export default persistReducer(persistConfig, paymentlockbox);