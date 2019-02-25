import * as Actions from '../actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {ADD_AUTH_NAVIGATION} from "../../../store/actions/fuse";

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
    Phone: '',
    url: '',
    menuObj: null
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN_START:
            return {...state, bLoginStart: action.payload};
        case Actions.LOGIN_SUCCESS:
        {
            const userState = {
                IsSuccess: action.payload.IsSuccess,
                UserId: action.payload.Data.UserId,
                apiKey: "",
                token: "",
                all_regions: action.payload.Data.Regions,
                defaultRegionId: action.payload.Data.DefaultRegionId,
                bLoginStart: false,
                firstName: action.payload.Data.FirstName,
                lastName: action.payload.Data.LastName,
                role: action.payload.Data.Roles[0].RoleName,
                Username: action.payload.Data.UserName,
                Phone: action.payload.Data.Phone,
                profilePhoto: action.payload.Data.ProfilePhoto,
                url: window.location.host.split(':')[0],
                DepartmentId: action.payload.Data.DepartmentId
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
            case ADD_AUTH_NAVIGATION:
            return {
                ...state,
                menuObj: action.payload
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
