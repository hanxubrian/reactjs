import * as Actions from "../actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as UserActions from "../../auth/store/actions";

const initialState = {
    homepageDB: null,
    data:null,
};

const homepage = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_HOME_WIDGETS:
            // return {
            //     ...state,
            //     data: {...action.payload}
            // };
            return {...state, data: action.payload}
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        default:
            return state;
    }
};
const persistConfig = {
    key: 'homepage',
    storage: storage,
    blacklist: ['homepageDB']
};
// export default dashboard;
export default persistReducer(persistConfig, homepage);