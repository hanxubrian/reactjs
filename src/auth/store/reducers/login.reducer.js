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
    message: ''
};

const login = function (state = initialState, action) {
    console.log('action type', action.type);
    switch ( action.type )
    {
        case Actions.LOGIN_START:
            return {...state, bLoginStart: action.payload};
        case Actions.LOGIN_SUCCESS:
        {
            const userState = {IsSuccess: action.payload.IsSuccess,
                UserId: action.payload.Data.id,
                apiKey: action.payload.Data.ApiKey,
                token: action.payload.Data.Token,
                all_regions: action.payload.Data.Regions,
                defaultRegionId: action.payload.Data.DefaultRegionId,
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
        case Actions.CLOSE_ALERT_DIALOG:
        case Actions.SEND_LOGOUT:
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
