import * as Actions from '../actions';

export const initialState = {
    IsSuccess: false,
    UserId: -1,
    apiKey: '',
    defaultRegionId: -1,
    all_regions: [],
    token: undefined,
    bShown: false
};

const login = function (state = initialState, action) {
    console.log('action type', action.type);
    switch ( action.type )
    {
       case Actions.LOGIN_SUCCESS:
        {
            const userState = {IsSuccess: action.payload.IsSuccess,
                UserId: action.payload.Data.id,
                apiKey: action.payload.Data.ApiKey,
                token: action.payload.Data.Token,
                all_regions: action.payload.Data.Regions,
                defaultRegionId: action.payload.Data.DefaultRegionId,
                bShown: true
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
                success: false,
                error  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default login;
