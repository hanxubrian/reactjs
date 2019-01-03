import * as Actions from '../actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    api: null,
    background: null,
};

const app = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.INITIAL_START:
        {
            return {
                ...initialState,
                loginLogo: action.payload.Settings.local.devices[0].assets.loginLogo,
                loginBackground: action.payload.Settings.local.devices[0].assets.hloginBg,
                navSideBarLogo: action.payload.Settings.local.devices[0].assets.sidebarLogo,
                navSideBarLeftBg: action.payload.Settings.local.devices[0].assets.vsidebarLeftBg,
            };
        }
        default:
        {
            return state
        }
    }
};

const persistConfig = {
    key: 'app',
    storage: storage
};
export default persistReducer(persistConfig, app);