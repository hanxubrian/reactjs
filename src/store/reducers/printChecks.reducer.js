import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import moment from 'moment'
import _ from "lodash"
import {GET_PRINT_CHECKS_DETAIL} from "../actions/";
import {GET_PRINT_CHECKS_DETAIL_ERROR} from "../actions/";

const initialState = {
    printChecksDB: null,
    printChecksDetail: null,
    bLoadedPrintChecksDetail: false,
    bStartFetchDetail_pc: false,
    bStartFetchList_pc: false,
    bSettingPanel: false,
    entityTypeId: '',
    selections: [],
    checksObj: null,
    filters: {
        checkDate: moment().format('MM/DD/YYYY'),
        paymentDate: moment().format('MM/DD/YYYY'),
        checktypeId: '5c72be751475600f94de5b33',
        year: moment().year(),
        month: moment().month()+1,
    }
};

const printChecks = function(state = initialState, action) {
    switch ( action.type ) {
        case Actions.GET_PRINT_CHECKS_DETAIL: {
            return {
                ...state, printChecksDB: action.payload, bLoadedPrintChecksDetail: true, bStartFetchList_pc: false,
            };
        }
        case Actions.GET_PRINT_CHECKS_DETAIL_ERROR: {
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
        case Actions.UPDATE_CHECKS_FILTER_PARAMETER: {
            let data = _.cloneDeep(state.filters);
            data[action.payload.name] = action.payload.value;
            return {
                ...state, filters: data
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
