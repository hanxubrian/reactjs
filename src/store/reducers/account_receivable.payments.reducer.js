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
    },
    bOpenedSummaryPanel: false,
    bOpenedFilterPanel: false,
};


const accountReceivablePayments = function(state = initialState, action) {

    switch ( action.type )
    {
        case Actions.GET_ALL_RECEIVABLE_PAYMENTS: {
            return{
                ...state,
                ACC_payments: action.payload.Data,
                bACC_fechStart: false
            }
        }
        case Actions.ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_FILTER_PANEL:
        {
            return {
                ...state, bOpenedFilterPanel: !state.bOpenedFilterPanel
            }
        }
        case Actions.ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_SUMMARY_PANEL:
        {
            return {
                ...state, bOpenedSummaryPanel: !state.bOpenedSummaryPanel
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