import * as Actions from '../../actions/fuse/index';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    state  : null,
    options: {
        anchorOrigin    : {
            vertical  : 'top',
            horizontal: 'center'
        },
        autoHideDuration: 6000,
        message         : "Hi",
        variant         : null
    }
};

const message = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SHOW_MESSAGE:
        {
            return {
                state  : true,
                options: {
                    ...initialState.options,
                    ...action.options
                }
            };
        }
        case Actions.HIDE_MESSAGE:
        {
            return {
                ...state,
                state: null
            };
        }
        default:
        {
            return state;
        }
    }
};

const persistConfig = {
    key: 'message',
    storage: storage
};
export default persistReducer(persistConfig, message);
// export default message;
