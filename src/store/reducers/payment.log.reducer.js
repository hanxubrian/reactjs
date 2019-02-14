import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import moment from 'moment'

const initialState = {
    paymentLogList: null,
    logDate: moment().format('MM/DD/YYYY'),
    bFilterPanelOpen: true
};


const paymentLog = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PAYMENT_LOG_LIST:
        {
            return {
                ...state,
                paymentLogList: action.payload
            };
        }
        case Actions.UPDATE_PAYMENT_LOG_DATE:
        {
            return {
                ...state,
                logDate: action.payload
            };
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
    key: 'paymentLog',
    storage: storage,
    blacklist: ['paymentLogList', 'bFilterPanelOpen']
};
export default persistReducer(persistConfig, paymentLog);
