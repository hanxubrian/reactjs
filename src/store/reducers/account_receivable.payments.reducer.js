import * as Actions from "../actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
    ACC_payments: [],
    bACC_fechStart: true,
    getPaymentsParam: {
        searchText: "",
        fromDate: "2019-01-22T06:15:42.6082822-06:00",
        toDate: "2019-01-22T06:15:42.6082822-06:00",
    }
};


const accountReceivablePayments = function(state = initialState, action) {

    switch ( action.type )
    {
        case Actions.GET_ALL_RECEIVABLE_PAYMENTS: {
            return{
                ...state,
                ACC_payments: action.payload,
                bACC_fechStart: false
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
export default persistReducer(persistConfig, accountReceivablePayments);