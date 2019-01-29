import * as Actions from '../actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    api: null,
    background: null,
    url: '',
    hidden: null
};


const app = function (state = initialState, action) {
            switch ( action.type )
            {
                case Actions.INITIAL_START:
                {
                    if (action.payload.Settings.local.mode !== 0) {
                        return {
                            ...initialState,
                            loginLogo: action.payload.Settings.local.devices[0].assets.loginLogo,
                            loginBackground: action.payload.Settings.local.devices[0].assets.hloginBg,
                            loginVideoBackground: action.payload.Settings.local.devices[0].assets.loginVideoBg,
                            navSideBarLogo: action.payload.Settings.local.devices[0].assets.sidebarLogo,
                            navSideBarIcon: action.payload.Settings.local.devices[0].assets.sidebarIcon,
                            navSideBarLeftBg: action.payload.Settings.local.devices[0].assets.vsidebarLeftBg,
                            copyRight: action.payload.Settings.local.copyright,
                            url: window.location.host.split(':')[0]
                        };
                    } else {
                        return {
                            loginLogo: action.payload.Settings.local.devices[0].assets.loginLogo,
                            hidden: 'hidden'
                        }
                    }
                }
                default:
                {
                    return state
                }
            }
}

const persistConfig = {
    key: 'app',
    storage: storage
};
export default persistReducer(persistConfig, app);