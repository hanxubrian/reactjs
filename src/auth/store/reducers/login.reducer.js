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
    menuObj: null,
    defaultPeriod: -1,
    all_periods: null,
    mfLoginStart: false
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN_START:
            return {...state, bLoginStart: action.payload};
        case Actions.LOGIN_SUCCESS:
        {
            let all_regions = action.payload.Data.Regions;
            let region = all_regions.filter(r=>r.regionid===action.payload.Data.DefaultRegionId);
            let all_periods = [];
            let defaultPeriod;

            if(region.length) {
                let periods = region[0].OpenPeriods;

                let period = periods.current.month.toString() + '/' + periods.current.year.toString();
                if (periods.current.month < 10)
                    period = '0' + period;
                if(periods.current.status==='Open')
                    all_periods.push(period);

                defaultPeriod = period;

                period = periods.next.month.toString() + '/' + periods.next.year.toString();
                if (periods.next.month < 10)
                    period = '0' + period;
                if(periods.next.status==='Open')
                    all_periods.push(period);
                period = periods.previous.month.toString() + '/' + periods.previous.year.toString();
                if (periods.previous.month < 10)
                    period = '0' + period;
                if(periods.previous.status==='Open')
                    all_periods.push(period);

            }

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
                defaultPeriod: defaultPeriod, all_periods: all_periods,
                ...userState
            };
        }
        case Actions.MICROSOFT_USER_LOGIN:
        {
            // console.log("microsoft",action.payload);
            if(action.payload.IsSuccess){
                window.location.href = action.payload.Data
            }
            return {
                mfLoginStart: true
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
        case Actions.CHANGE_DEFAULT_PERIOD:
            return {
                ...state,
                defaultPeriod: action.payload
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
    blacklist: ['bLoginStart','regionId', 'defaultPeriod', 'all_periods']
};
export default persistReducer(persistConfig, login);
