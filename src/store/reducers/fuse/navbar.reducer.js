import * as Actions from '../../actions/fuse/index';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    foldedOpen: false,
    mobileOpen: false,
    iframeURL: ''
};

const navbar = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.TOGGLE_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: !state.foldedOpen
            }
        }
        case Actions.OPEN_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: true
            }
        }
        case Actions.CLOSE_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: false
            }
        }
        case Actions.TOGGLE_MOBILE_NAVBAR:
        {
            return {
                ...state,
                mobileOpen: !state.mobileOpen
            }
        }
        case Actions.OPEN_MOBILE_NAVBAR:
        {
            return {
                ...state,
                mobileOpen: true
            }
        }
        case Actions.CLOSE_MOBILE_NAVBAR:
        {
            return {
                ...state,
                mobileOpen: false
            }
        }

        case Actions.SELECT_IFRAME:
        {
            return {
                ...state,
                iframeURL: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
};
const persistConfig = {
    key: 'navbar',
    storage: storage
};
export default persistReducer(persistConfig, navbar);
