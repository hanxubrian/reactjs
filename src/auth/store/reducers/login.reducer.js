import * as Actions from '../actions';
import {CLOSE_ALERT_DIALOG} from "../actions";

export const initialState = {
    IsSuccess: false,
    UserId: -1,
    apiKey: '',
    defaultRegionId: -1,
    all_regions: [],
    token: undefined,
    bLoginStart: false,
    bAlertShown: false,
    message: '',
    bLoadedMenu: false
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN_START:
            return {...state, bLoginStart: action.payload};
        case Actions.LOGIN_SUCCESS:
        {
            const userState = {IsSuccess: action.payload.IsSuccess,
                UserId: action.payload.id,
                apiKey: action.payload.ApiKey,
                token: action.payload.Token,
                all_regions: action.payload.Regions,
                defaultRegionId: action.payload.DefaultRegionId,
                bLoginStart: false
            };
            return {
                ...initialState,
                ...userState
            };
        }
        case Actions.INITIALIZE_FROM_LOCAL:
            const userState = {IsSuccess: action.payload.IsSuccess,
                UserId: action.payload.id,
                apiKey: action.payload.apiKey,
                token: action.payload.token,
                all_regions: action.payload.all_regions,
                defaultRegionId: action.payload.defaultRegionId,
            };
            return {
                ...initialState,
                ...userState
            };
        case Actions.CHANGE_REGION_ID:
            return {
                ...state,
                defaultRegionId: action.payload
            };

        case Actions.LOGIN_ERROR:
        {
            return {
                ...initialState,
                bLoginStart  : false,
                bAlertShown: true,
                message: action.payload
            };
        }
        case Actions.LOADED_MENU:
        {
            return {
                ...state,
                bLoadedMenu: true
            };
        }
        case Actions.CLOSE_ALERT_DIALOG:
        case Actions.USER_LOGGED_OUT:
        {
            return {
                ...initialState,
            };
        }
        default:
        {
            return state
        }
    }
};

export default login;
