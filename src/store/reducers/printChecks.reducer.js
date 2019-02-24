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
    bSettingPanel: false,
    checkDate: moment().format('MM/DD/YYYY'),
    paymentDate: moment().format('MM/DD/YYYY'),
    checktypeId: '5c72be751475600f94de5b33',
    entityTypeId: '',
    year: moment().year(),
    month: moment().month()+1,
    selections: [],
    checksObj: null
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
        case Actions.TOGGLE_FILTER_PANEL_CHECK_PRINTING: {
            return {
                ...state, bSettingPanel: !state.bSettingPanel
            };
        }
        case Actions.NULLIFY_CHECKS_OBJ: {
            return {
                ...state, checksObj: null
            };
        }
        case Actions.SET_CHECKS_OBJ: {
            return {
                ...state, checksObj: action.payload
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
    blacklist: ['printChecksDB', 'printChecksDetail', 'selections', 'bSettingPanel']
};
export default persistReducer(persistConfig, printChecks);
