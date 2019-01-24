import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {CREATE_BILLRUN_FAILD, CREATE_BILLRUN_START} from "../actions/billrun.action";

const initialState = {
    billrunsDB              : null,
    bLoadedBillruns         : false,
    billruncreate           : null,
    loadingstatus           : false,
    billrunstatus           : 10,
};


const billruns = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_BILLRUNS:
        {
            return {
                ...initialState,
                billrunsDB: action.payload, bLoadedBillruns: true
            };
        }
        case Actions.REMOVE_SELECTED_BILLRUN:
        {
            return {...state, billrunsDB: action.payload}

        }
        case Actions.CREATE_BILLRUN_SUCCESS:
        {
            let middb = state.billrunsDB;
            middb.unshift(action.payload.Data);
            // console.log("#########middb",middb);
            return {
                ...state,billruncreate: action.payload,loadingstatus: false,billrunstatus:200,

            }
        }
        case Actions.CREATE_BILLRUN_START:
        {
            return {
                ...state,loadingstatus: true,billrunstatus:100,
            }
        }
        case Actions.CREATE_BILLRUN_FAILD:
        {
            return {
                ...state,loadingstatus: false,billrunstatus:400,
            }
        }
        case Actions.GET_ALL_BILLRUN_START:
        {
            return {
                ...state,loadingstatus: true
            }
        }
        case Actions.GET_ALL_BILLRUN_SUCCESS:
        {
            return {
                ...state,billrunsDB: action.payload,loadingstatus: false
            }
        }
        case Actions.GET_ALL_BILLRUN_FAILD:
        {
            return {
                ...state,loadingstatus: false
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
    key: 'billruns',
    storage: storage,
};
export default persistReducer(persistConfig, billruns);
