import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import moment from 'moment'


const initialState = {
    printChecksDB: null,
    printChecksDetail: null,
    bLoadedPrintChecksDetail: false,
    bStartFetchDetail_pc: false,
    bStartFetchList_pc: false,
    bSettingPanel: true,
    checkDate: moment().format('MM/DD/YYYY'),
    paymentDate: moment().format('MM/DD/YYYY'),
    checktypeId: '5c670724580ae04184e50a70',
    entityTypeId: '',
    year: moment().year(),
    month: moment().month()+1,
    selections: []
};

const printChecks = function(state = initialState, action) {
    switch ( action.type ) {
        case Actions.GET_ALL_PRINT_CHECKS_LIST: {
            return {
                ...state, printChecksDB: action.payload, bLoadedPrintChecksDetail: true, bStartFetchList_pc: false,
            };
        }
        case Actions.GET_ALL_PRINT_CHECKS_LIST_ERROR: {
            return {
                ...state, printChecksDB: null, bLoadedPrintChecksDetail: true, bStartFetchList_pc: false
            };
        }
        case Actions.START_FETCH_PRINT_CHECKS_LIST: {
            return {
                ...state, printChecksDB: null, bStartFetchList_pc: true
            };
        }
        case Actions.UPDATE_CHECK_SELECTIONS: {
            return {
                ...state, selections: action.payload
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
