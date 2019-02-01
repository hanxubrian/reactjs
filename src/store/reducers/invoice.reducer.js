import moment from "moment"

import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import _ from 'lodash';


let today = new Date();
const initialState = {
    invoicesDB: null,
    invoiceDetail: null,
    invoiceDetailStatus: null,
    bLoadedInvoices: false,
    bInvoiceErr: false,
    invoiceErrMsg: '',

    bOpenedSummaryPanel: false,
    bOpenedFilterPanel: false,
    bStartingSaveFormData: false,
    transactionStatus:{checkedEbill: true, checkedPrint: true },
    invoiceForm: {
        type : 'new',
        props: {
            open: false
        },
        data : null,
        customer: null
    },
    FromDate:moment().date(1).format("MM/DD/YYYY"),
    ToDate: moment().add(1,'months').endOf('month').format("MM/DD/YYYY"),
    StatusId: [],
    PeriodId: [220],
    InvoiceTypeId: 1,
    ToPrintOrToEmail: "print",
    SearchText: "",
    invoiceStatus: [],
    bInvoiceStart: false,
    customerTaxAmountLine: [],
    invoiceDateOption: 13,
    newInvoice: null,

    customersDB: null,
    bSuggestCustomersFetchStart: false,
    bLoadedSuggestCustomers: false,
    customerErrMsg: '',
    bCustomerErr: false,

    bInvoicesUpdated: false,
    removedId: undefined,
    billingLists: null,
    serviceLists: null,
    bOpenPaymentInvoiceForm: false,
};


const invoices = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_INVOICES:
        {
            return {
                ...state,
                invoicesDB: action.payload, bLoadedInvoices: true, bInvoiceStart: false, bInvoicesUpdated: false, bInvoiceErr: false,invoiceErrMsg:''
            };
        }
        case Actions.GET_ALL_INVOICES_ERR:
        {
            return {
                ...state,
                invoicesDB: null, bLoadedInvoices: true, bInvoiceStart: false, bInvoicesUpdated: false, invoiceErrMsg: action.payload,bInvoiceErr: true,
            };
        }
        case Actions.CLOSE_INVOICE_ERROR_DIALOG:
        {
            return {
                ...state,
                invoiceErrMsg: '', bInvoiceErr: false,
            };
        }
        case Actions.GET_ALL_SUGGEST_CUSTOMERS:
        {
            return {
                ...state,
                customersDB: action.payload,
                bLoadedSuggestCustomers: true,
                bSuggestCustomersFetchStart: false,
                customerErrMsg: '',
                bCustomerErr: false,
            };
        }
        case Actions.GET_ALL_SUGGEST_CUSTOMERS_ERROR:
        {
            return {
                ...state,
                customersDB: null,
                bLoadedSuggestCustomers: true,
                bSuggestCustomersFetchStart: false,
                customerErrMsg: action.payload,
                bCustomerErr: true,
            };
        }
        case Actions.CLOSE_CUSTOMER_ERROR_DIALOG:
        {
            return {
                ...state, customerErrMsg: '', bCustomerErr: false,
            };
        }
        case Actions.GET_SUGGEST_CUSTOMERS_FETCH_START:
        {
            return {
                ...state, bSuggestCustomersFetchStart: true
            }
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
        case Actions.GET_INVOICE_DETAIL:
        {
            return {
                ...state,
                invoiceDetail: action.payload.data,
                bLoadedInvoices: true,
                bInvoiceStart: false,
                invoiceDetailStatus: true,
            }
        }
        case Actions.GET_INVOICE_DETAIL_START:
        {
            return {
                ...state,invoiceDetailStatus:false,
            }
        }
        case Actions.GET_INVOICE_DETAIL_FAILD:
        {
            return {
                ...state,
                invoiceDetail: action.payload,invoiceDetailStatus:false,
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
        case Actions.GET_CUSTOMER_TAX_AMOUNT:{
            if(state.customerTaxAmountLine.length===0)
                return {
                    ...state, customerTaxAmountLine: [{...action.payload, originalTax: action.payload.TotalTaxAmount}]
                };
            else {
                let index = action.payload.id;
                const data = _.cloneDeep(state.customerTaxAmountLine);
                let line = state.customerTaxAmountLine.filter(c=>index===c.id);
                if(line.length)
                    data[index] = {...action.payload, originalTax: action.payload.TotalTaxAmount};
                else
                    data.push({...action.payload, originalTax: action.payload.TotalTaxAmount});
                return {
                    ...state, customerTaxAmountLine: data
                }
            }
        }
        case Actions.UPDATE_INVOICE_DATE_OPTION:{
            return {
                ...state, invoiceDateOption: action.payload
            }
        }
        case Actions.UPDATE_INVOICE_PERIOD_OPTION:{
            return {
                ...state, ...action.payload
            }
        }
        case Actions.SELECT_INVOICE_CUSTOMER:
        {
            return {
                ...state,
                invoiceForm: {...state.invoiceForm, customer: action.payload}
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
            return {...state, removedId: action.payload}

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
                },
                newInvoice: null,
                invoiceDetail: null,
                customerTaxAmountLine: []
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
                    customer: null
                },
                bInvoiceStart: false
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
                },
                newInvoice: null,
                invoiceDetail: null,
                customerTaxAmountLine: []
            };
        }
        case Actions.UPDATE_INVOICE_LINE:
        {
            const data = _.cloneDeep(action.payload);
            return {
                ...state,
                invoiceForm: {...state.invoiceForm, data: {line: data}}
            }
        }
        case Actions.STARTING_SAVE_INVOICE_FORM_DATA: {
            return {
                ...state,
                bStartingSaveFormData: true
            }
        }
        case Actions.RESET_INVOICE_FORM: {
            return {
                ...state,
                bStartingSaveFormData: false,
                invoiceForm: {...state.invoiceForm, data: null, customer: null},
                newInvoice: null
            }
        }
        case Actions.ADD_INVOICE:
        case Actions.UPDATE_AN_INVOICE:
        {
            return {...state, newInvoice: action.payload}
        }
        case Actions.UPDATED_INVOICES: {
            return {...state, bInvoicesUpdated: true, bInvoiceStart: true}
        }
        case Actions.GET_BILLING_LIST:
            return {...state, billingLists: action.payload};
        case Actions.GET_SERVICE_LIST:
            return {...state, serviceLists: action.payload};
        case Actions.OPEN_PAYMENT_INVOICE_FORM: {
            return {...state, bOpenPaymentInvoiceForm: true}
        }
        case Actions.CLOSE_PAYMENT_INVOICE_FORM: {
            return {...state, bOpenPaymentInvoiceForm: false}
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
    blacklist: ['invoicesDB', 'customersDB', 'bInvoiceStart', 'bOpenedSummaryPanel', 'bOpenedFilterPanel', 'bLoadedCustomers',
        'customerTaxAmountLine', 'invoiceForm', 'invoiceDateOption', 'bCustomerErr', 'bInvoiceErr', 'bOpenPaymentInvoiceForm']
};
export default persistReducer(persistConfig, invoices);
