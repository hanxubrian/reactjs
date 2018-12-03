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
            console.log(userState);

            return {
                ...initialState,
                ...userState
            };
        }
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
