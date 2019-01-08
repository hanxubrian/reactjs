import moment from "moment"

import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


let today = new Date();
const initialState = {
    invoicesDB: null,
    bLoadedInvoices: false,
    bOpenedSummaryPanel: false,
    bOpenedFilterPanel: false,
    transactionStatus:{checkedEbill: true, checkedPrint: true },
    invoiceForm: {
        type : 'new',
        props: {
            open: false
        },
        data : null,
        customer: null
    },
    FromDate: moment("01/01/2018").format("MM/DD/YYYY"),
    ToDate: moment(today).format("MM/DD/YYYY"),
    StatusId: [1],
    PeriodId: [220],
    OpenOrClosed: "N",
    InvoiceTypeId: 1,
    ToPrintOrToEmail: "print",
    SearchText: "",
    invoiceStatus: [],
    bInvoiceStart: false
};


const invoices = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_INVOICES:
        {
            return {
                ...state,
                invoicesDB: action.payload, bLoadedInvoices: true, bInvoiceStart: false
            };
        }
        case Actions.GET_INVOICE_STATUS:
        {
            let invoiceStatus = action.payload;
            if(action.payload.length>0) {
                invoiceStatus = action.payload.map(iv => {
                    return {['checked'+iv.TransactionStatusListId]: true, ...iv}
                });
            }
            return {
                ...state, invoiceStatus: invoiceStatus
            }
        }
        case Actions.GET_INVOICES_FETCH_START:
        {
            return {
                ...state,
                bInvoiceStart: true
            };
        }
        case Actions.UPDATE_FROM_DATE_INVOICE:
        {
            return {
                ...state, FromDate: action.payload
            }
        }
        case Actions.UPDATE_TO_DATE_INVOICE:
        {
            return {
                ...state, ToDate: action.payload
            }
        }
        case Actions.UPDATE_FROM_DATE_INVOICE:{
            return {
                ...state, invoiceStatus:[...action.payload]
            }
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
        case Actions.OPEN_NEW_INVOICE_FORM:
        {
            return {
                ...state,
                invoiceForm: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null,
                    customer: null
                }
            };
        }
        case Actions.CLOSE_NEW_INVOICE_FORM:
        {
            return {
                ...state,
                invoiceForm: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null,
                    customer: null
                }
            };
        }
        case Actions.OPEN_EDIT_INVOICE_FORM:
        {
            return {
                ...state,
                invoiceForm: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : null,
                    customer: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_INVOICE_FORM:
        {
            return {
                ...state,
                invoiceForm: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null,
                    customer: null
                }
            };
        }
        case Actions.UPDATE_INVOICE_LINE:
        {
            return {
                ...state,
                invoiceForm: {...state.invoiceForm, data: {line: action.payload}}
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
    blacklist: ['invoicesDB', 'bInvoiceStart', 'bOpenedSummaryPanel', 'bOpenedFilterPanel', 'bLoadedCustomers']
};
export default persistReducer(persistConfig, invoices);
