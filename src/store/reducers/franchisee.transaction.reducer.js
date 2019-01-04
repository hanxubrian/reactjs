import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    transactionsDB: null,
    bLoadedTransactions: false,
    bOpenedTransactionFilterPanel: false,
    transactionStatus:{checkedCompleted: true, checkedOpen: true},
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
