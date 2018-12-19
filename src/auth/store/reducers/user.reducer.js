import * as Actions from '../actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    role: 'guest',
    data: {
        'displayName': 'John Doe',
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : 'johndoe@withinpixels.com',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    }
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

const persistConfig = {
    key: 'user',
    storage: storage,
    blacklist: ['bLoginStart','regionId']
};
export default persistReducer(persistConfig, user);
// export default user;
