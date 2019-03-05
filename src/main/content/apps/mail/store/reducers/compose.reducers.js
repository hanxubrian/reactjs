import * as Actions from '../actions';
import * as UserActions from "../../../../../../auth/store/actions";

const initialState = {
    toggleCompose: false
};

const compose = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.TOGGLE_COMPOSE:
        {
            return {
                ...state,
                toggleCompose: action.payload
            };
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

export default compose;
