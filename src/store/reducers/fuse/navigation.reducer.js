import * as Actions from '../../actions/fuse/index';
import {fuseNavigationConfig} from 'fuse-configs/fuseNavigationConfig';

const initialState = fuseNavigationConfig;
// const initialState1 = [];

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
                ...initialState, ...action.navigation
            ];
        }
        default:
        {
            return state;
        }
    }
};

export default navigation;
