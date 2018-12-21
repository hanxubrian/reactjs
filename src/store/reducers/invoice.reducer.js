import * as Actions from "../actions/invoice.actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    invoicesDB: null,
    bLoadedInvoices: false
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
