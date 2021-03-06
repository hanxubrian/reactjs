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
                        return {
                            ...initialState,
                            loginLogo: action.payload.Data.environments[0].devices[0].assets.loginLogo,
                            loginBackground: action.payload.Data.environments[0].devices[0].assets.hloginBg,
                            loginVideoBackground: action.payload.Data.environments[0].devices[0].assets.loginVideoBg,
                            navSideBarLogo: action.payload.Data.environments[0].devices[0].assets.sidebarLogo,
                            navSideBarIcon: action.payload.Data.environments[0].devices[0].assets.sidebarIcon,
                            navSideBarLeftBg: action.payload.Data.environments[0].devices[0].assets.vsidebarLeftBg,
                            copyRight: action.payload.Data.environments[0].copyright,
                            url: window.location.host.split(':')[0]
                        };
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
