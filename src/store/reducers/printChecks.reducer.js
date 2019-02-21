import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
    printChecksDB: null,
    printChecksDetail: null,
    bLoadedPrintChecksDetail: false,
    bStartFetchDetail_pc: false,
    bStartFetchList_pc: false,

};

const printChecks = function(state = initialState, action) {
    switch ( action.type ) {
        case Actions.GET_PRINT_CHECKS_DETAIL: {
            return {
                ...state, printChecksDetail: action.payload, bLoadedPrintChecksDetail: true, bStartFetchDetail_pc: false,
            };
        }
        case Actions.GET_PRINT_CHECKS_DETAIL_ERROR: {
            return {
                ...state, printChecksDetail: null, bLoadedPrintChecksDetail: true, bStartFetchDetail_pc: false
            };
        }
        case Actions.START_FETCH_PRINT_CHECKS_DETAIL: {
            return {
                ...state, printChecksDetail: null, bStartFetchDetail_pc: true
            };
        }
        case UserActions.USER_LOGGED_OUT:{
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
    key: 'printChecks',
    storage: storage,
    blacklist: ['printChecksDB', 'printChecksDetail']
};
export default persistReducer(persistConfig, printChecks);
