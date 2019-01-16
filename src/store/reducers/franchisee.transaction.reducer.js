import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    transactionsDB: null,
    bLoadedTransactions: false,
    bOpenedTransactionFilterPanel: false,
    transactionStatus:{checkedCompleted: true, checkedOpen: true},
    transactionForm: {
        type : 'new',
        props: {
            open: false
        },
        data : null,
        franchisee: null
    },
    newTransaction: null
};

const transactions = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_FRANCHISEE_TRANSACTIONS:
        {
            return {
                ...initialState,
                transactionsDB: action.payload, bLoadedTransactions: true
            };
        }
        case Actions.REMOVE_SELECTED_FRANCHISEE_TRANSACTION:
        {
            return {...state, transactionsDB: action.payload}
        }
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
                    data : null,
                    franchisee: null
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
                    data : null,
                    franchisee: null
                },
                newTransaction: null
            };
        }
        case Actions.OPEN_EDIT_TRANSACTION_FORM:
        {
            return {
                ...state,
                transactionForm: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null,
                    franchisee: action.payload
                },
            };
        }
        case Actions.CLOSE_EDIT_TRANSACTION_FORM:
        {
            return {
                ...state,
                transactionForm: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null,
                    franchisee: action.payload
                },
                newTransaction: null
            };
        }
        case Actions.SELECT_TRANSACTION_FRANCHISEE:
        {
            return {
                ...state,
                transactionForm: {...state.transactionForm, franchisee: action.payload}
            }
        }
        case Actions.UPDATE_TRANSACTION_LINE:
        {
            return {
                ...state,
                transactionForm: {...state.transactionForm, data: {line: action.payload}}
            }
        }
        default:
        {
            return state;
        }
    }
};

const persistConfig = {
    key: 'transactions',
    storage: storage,
    blacklist: ["bOpenedTransactionFilterPanel"]
};
export default persistReducer(persistConfig, transactions);
