import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    invoicesDB: null,
    bLoadedInvoices: false,
    bOpenedSummaryPanel: true,
    bOpenedFilterPanel: true,
    transactionStatus:{checkedPaid: true,checkedPP: true, checkedComplete: true, checkedOpen: true }
};


const invoices = function(state = initialState, action) {
    console.log('action=', action.payload);
    switch ( action.type )
    {
        case Actions.GET_ALL_INVOICES:
        {
            return {
                ...initialState,
                invoicesDB: action.payload, bLoadedInvoices: true
            };
        }
        case Actions.OPEN_SUMMARY_PANEL:
        {
            return {
                ...state, bOpenedSummaryPanel: true
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        case Actions.CLOSE_SUMMARY_PANEL:
        {
            return {
                ...state, bOpenedSummaryPanel: false
            }
        }
        case Actions.OPEN_FILTER_PANEL:
        {
            return {
                ...state, bOpenedFilterPanel: true
            }
        }
        case Actions.CLOSE_FILTER_PANEL:
        {
            return {
                ...state, bOpenedFilterPanel: false
            }
        }
        case Actions.TOGGLE_FILTER_STATUS:{
            return {
                ...state, transactionStatus:{...state.transactionStatus,...action.payload}
            }
        }
        default:
        {
            return state;
        }
    }
};

const persistConfig = {
    key: 'invoices',
    storage: storage,
};
export default persistReducer(persistConfig, invoices);
