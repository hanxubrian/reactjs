import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
   creditInvoiceList: null
}

const territories = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PAYMENTS_DIALOG_INVOICE_LIST:
        {
            return {
                ...state,
                creditInvoiceList: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

const persistConfig = {
    key: 'territories',
    storage: storage,
};
export default persistReducer(persistConfig, territories);