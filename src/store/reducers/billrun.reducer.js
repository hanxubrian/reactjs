import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    billrunsDB: null,
    bLoadedBillruns: false,
};


const billruns = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_BILLRUNS:
        {
            return {
                ...initialState,
                billrunsDB: action.payload, bLoadedBillruns: true
            };
        }
        case Actions.REMOVE_SELECTED_BILLRUN:
        {
            return {...state, billrunsDB: action.payload}

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
    key: 'billruns',
    storage: storage,
};
export default persistReducer(persistConfig, billruns);
