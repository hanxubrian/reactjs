import * as Actions from '../actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

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
    bLoadedMenu: false,
    firstName: '',
    lastName: '',
    role: [],
    Username: '',
    Phone: ''
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
                bLoginStart: false,
                firstName: action.payload.FirstName,
                lastName: action.payload.LastName,
                role: action.payload.Roles[0].RoleName,
                Username: action.payload.Username,
                Phone: action.payload.Phone,
                profilePhoto: action.payload.ProfilePhoto
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
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                role: action.payload.role,
                profilePhoto: action.payload.ProfilePhoto
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

const persistConfig = {
    key: 'login',
    storage: storage,
    blacklist: ['bLoginStart','regionId']
};
export default persistReducer(persistConfig, login);
