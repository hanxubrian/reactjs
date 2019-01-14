import moment from "moment"

import * as Actions from "../actions";

import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    paymentsDB: null,
    bOpenedFilterPanel: false,
}

const payments = function (state = initialState, action) {
    switch (action.type) {
        case Actions.PAYMENTLIST_TOGGLE_FILTER_PANEL:
        {
            return {
                ...state, bOpenedFilterPanel: !state.bOpenedFilterPanel
            }
        }
        default:
        {
            return state;
        }
    }
};
const persistConfig = {
    key: 'payments',
    storage: storage,
    blacklist: ['paymentsDB']
};
export default persistReducer(persistConfig, payments);