import * as Actions from '../actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    success: false,
    error  : {
        username: null,
        password: null
    }
};

const register = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REGISTER_SUCCESS:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case Actions.REGISTER_ERROR:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

const persistConfig = {
    key: 'register',
    storage: storage
};
export default persistReducer(persistConfig, register);
// export default register;