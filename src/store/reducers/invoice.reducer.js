import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    invoicesDB: null,
    bLoadedInvoices: false,
    bOpenedSummaryPanel: true,
    bOpenedFilterPanel: true,
    transactionStatus:{checkedPaid: true,checkedPP: true, checkedComplete: true, checkedOpen: true, checkedEbill: true, checkedPrint: true },
    invoiceDialog: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};


const invoices = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_INVOICES:
        {
            return {
                ...initialState,
                invoicesDB: action.payload, bLoadedInvoices: true
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
        case Actions.DELETE_SELECTED_INVOICES:
        {
            return {...state, invoicesDB: action.payload}

        }
        case Actions.REMOVE_SELECTED_INVOICE:
        {
            return {...state, invoicesDB: action.payload}

        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        case Actions.OPEN_NEW_INVOICE_DIALOG:
        {
            return {
                ...state,
                invoiceDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_INVOICE_DIALOG:
        {
            return {
                ...state,
                invoiceDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_INVOICE_DIALOG:
        {
            return {
                ...state,
                invoiceDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_INVOICE_DIALOG:
        {
            return {
                ...state,
                contactInvoice: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
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
