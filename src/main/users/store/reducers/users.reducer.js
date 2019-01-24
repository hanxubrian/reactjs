import * as Actions from '../actions';
const initialState = {
    openUsersFormStatus: false,
}

const usersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.OPEN_USERS_FORM: {
            return {
                ...state,
                openUsersFormStatus: action.payload
            }
        }
        default:
            return state;
    }
};

export default usersReducer;