import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as Actions from '../../actions/fuse/index';
import  * as UserActions from '../../../auth/store/actions';
import {fuseNavigationConfig} from 'fuse-configs/fuseNavigationConfig';

const initialState = fuseNavigationConfig;

const navigation = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_NAVIGATION:
        {
            console.log('pass');
            return [
                ...state
            ];
        }
        case Actions.SET_NAVIGATION:
        {
            console.log('pass1');
            return [
                ...action.navigation
            ];
        }
        case Actions.RESET_NAVIGATION:
        case UserActions.USER_LOGGED_OUT:
        {
            console.log('pass2');
            return [
                ...initialState
            ];
        }
        case Actions.ADD_AUTH_NAVIGATION:
        {
            console.log('pass3');
            return [
                ...initialState, ...action.payload
            ];
        }
        default:
        {
            return state;
        }
    }
};


const persistConfig = {
    key: 'navigation',
    storage: storage,
};
export default navigation;
// export default persistReducer(persistConfig, navigation);
