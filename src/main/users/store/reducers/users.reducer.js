import * as Actions from '../actions';
const initialState = {
    openUsersFormStatus: false,
    selectedRows: []
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
        case Actions.UPDATE_SELECT_ROWS:{
            return{
                ...state,
                selectedRows: action.payload
            }
        }
        default:
            return state;
    }
};

export default usersReducer;