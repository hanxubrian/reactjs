import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {GET_FRANCHISEE_TRANSACTION_TAX_AMOUNT} from "../actions/";

const initialState = {
    transactionsDB: null,
    transactionDetail: null,
    bLoadedTransactions: false,
    bStartFetchTransactions: false,
    bOpenedTransactionFilterPanel: false,
    bTransactionsUpdated: false,
    transactionStatus:{checkedCompleted: true, checkedOpen: true},
    transactionTypeList: null,
    transactionForm: {
        type : 'new',
        props: {
            open: false
        },
        franchisee: null,
        bVendorBox: false,
        vendor: null
    },
    newTransaction: null,
    removedTrxKey: undefined,
    transactionTax: null
};

const transactions = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_FRANCHISEE_TRANSACTIONS:
        {
            return {
                ...state,
                transactionsDB: action.payload, bLoadedTransactions: true, bTransactionsUpdated: false, bStartFetchTransactions: false
            };
        }
        case Actions.REMOVE_SELECTED_FRANCHISEE_TRANSACTION:
        {
            return {...state, removedTrxKey: action.payload}
        }
        case Actions.START_FETCH_TRANSACTIONS:
            return {...state,bStartFetchTransactions: true};
        case Actions.TOGGLE_TRANSACTION_FILTER_PANEL:
        {
            return {
                ...state, bOpenedTransactionFilterPanel: !state.bOpenedTransactionFilterPanel
            }
        }
        case Actions.TOGGLE_TRANSACTION_FILTER_STATUS:
        {
            return {
                ...state, transactionStatus:{...state.transactionStatus,...action.payload}
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        case Actions.OPEN_NEW_TRANSACTION_FORM:
        {
            return {
                ...state,
                transactionForm: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    franchisee: null,
                    bVendorBox: false,
                    vendor: null
                },

            };
        }
        case Actions.CLOSE_NEW_TRANSACTION_FORM:
        {
            return {
                ...state,
                transactionForm: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    franchisee: null,
                    bVendorBox: false,
                    vendor: null
                },
                newTransaction: null,
                transactionDetail: null
            };
        }
        case Actions.OPEN_EDIT_TRANSACTION_FORM:
        {
            return {
                ...state,
                transactionForm: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    franchisee: null,
                    trxRowInfo: action.payload,
                    bVendorBox: false,
                    vendor: null
                },
                bStartFetchTransactions: false
            };
        }
        case Actions.CLOSE_EDIT_TRANSACTION_FORM:
        {
            return {
                ...state,
                transactionForm: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    franchisee: null,
                    trxRowInfo: null,
                    bVendorBox: false,
                    vendor: null
                },
                newTransaction: null,
                transactionDetail: null
            };
        }
        case Actions.SELECT_TRANSACTION_FRANCHISEE:
        {
            return {
                ...state,
                transactionForm: {...state.transactionForm, franchisee: action.payload}
            }
        }
        case Actions.GET_TRANSACTION_DETAIL:
        {
            return {
                ...state, transactionDetail: action.payload

            }
        }
        case Actions.SHOW_VENDOR_DIALOG_BOX:
            return {...state,
                transactionForm: {...state.transactionForm, bVendorBox: true}
            };
        case Actions.HIDE_VENDOR_DIALOG_BOX:
            return {...state,
                transactionForm: {...state.transactionForm, bVendorBox: false}
            };
        case Actions.UPDATE_TRANSACTION_VENDOR:
            return {...state, transactionForm: {...state.transactionForm, vendor: action.payload}};
        case Actions.CREATE_NEW_TRANSACTION:
        case Actions.UPDATE_A_FRANCHISEE_TRANSACTION:
        {
            return {
                ...state,
                newTransaction: action.payload,
                bTransactionsUpdated: true, bStartFetchTransactions: true
            };
        }
        case Actions.GET_FRANCHISEE_TRANSACTION_TYPE_LIST:
        {
            return {
                ...state,
                transactionTypeList: action.payload
            };
        }
        case Actions.GET_FRANCHISEE_TRANSACTION_TAX_AMOUNT:
        {
            return {
                ...state,
                transactionTax: action.payload
            };
        }

        case Actions.RESET_TRANSACTION_FORM:
            return {
                ...state, newTransaction: null,
                transactionForm: {
                    ...state.transactionForm,
                    franchisee: null,
                    bVendorBox: false,
                    vendor: null
                }
            };
        default:
        {
            return state;
        }
    }
};

const persistConfig = {
    key: 'transactions',
    storage: storage,
    blacklist: ['bOpenedTransactionFilterPanel', 'transactionForm']
};
export default persistReducer(persistConfig, transactions);
