import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    customersDB: null,
    bLoadedCustomers: false,
    bOpenedSummaryPanel: true,
    bOpenedFilterPanel: true,
    transactionStatus:{checkedPaid: true,checkedPP: true, checkedComplete: true, checkedOpen: true }
};


const customers = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_CUSTOMERS:
        {
            return {
                ...initialState,
                customersDB: action.payload, bLoadedCustomers: true
            };
        }
        case Actions.TOGGLE_FILTER_PANEL:
        {
            return {
                ...state, bOpenedFilterPanel: !state.bOpenedFilterPanel
            }
        }
        case Actions.TOGGLE_SUMMARY_PANEL:
        {
            return {
                ...state, bOpenedSummaryPanel: !state.bOpenedSummaryPanel
            }
        }
        case Actions.TOGGLE_FILTER_STATUS:{
            return {
                ...state, transactionStatus:{...state.transactionStatus,...action.payload}
            }
        }
        case Actions.DELETE_SELECTED_CUSTOMERS:
        {
            return {...state, customersDB: action.payload}

        }
        case Actions.REMOVE_SELECTED_CUSTOMER:
        {
            return {...state, customersDB: action.payload}

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
    key: 'customers',
    storage: storage,
};
export default persistReducer(persistConfig, customers);
