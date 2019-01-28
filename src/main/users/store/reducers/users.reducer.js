import * as Actions from '../actions';
import * as UserActions from "../../../../auth/store/actions";
const initialState = {
    openUsersFormStatus: false,
    selectedRows: [],
    fpStatus: false,
}

const usersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.OPEN_USERS_FORM: {
            return {
                ...state,
                openUsersFormStatus: action.payload,
                fpStatus: false,
            }
        }
        case Actions.UPDATE_USER_SELECT_ROWS:{
            return{
                ...state,
                selectedRows: action.payload
            }
        }
        case Actions.TOGGLE_USERS_FILTER_PANEL: {
            return{
                ...state,
                fpStatus: !state.fpStatus
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        default:
            return state;
    }
};

export default usersReducer;