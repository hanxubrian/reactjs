import * as Actions from "../actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
    ACC_Payments: []
};


const AccountReceivablePayments = function(state = initialState, action) {

    switch ( action.type )
    {
        case Actions.GET_ALL_RECEIVABLE_PAYMENTS: {
            return{
                ...state,
                ACC_Payments: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
};

const persistConfig = {
    key: 'account_receivable_payments',
    storage: storage,
};
export default persistReducer(persistConfig, AccountReceivablePayments);