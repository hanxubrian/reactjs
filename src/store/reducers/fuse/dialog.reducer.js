import * as Actions from '../../actions/fuse/index';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    state  : false,
    options: {
        children: 'Hi'
    }
};

const dialog = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.OPEN_DIALOG:
        {
            return {
                ...state,
                state  : true,
                options: {
                    ...state.options,
                    ...action.options
                }
            };
        }
        case Actions.CLOSE_DIALOG:
        {
            return {
                ...state,
                state: false
            };
        }
        default:
        {
            return state;
        }
    }
};

const persistConfig = {
    key: 'dialog',
    storage: storage,
    blacklist: ['bLoginStart','regionId']
};
export default persistReducer(persistConfig, dialog);
// export default dialog;
