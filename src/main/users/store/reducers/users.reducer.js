import * as Actions from '../actions';
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
                openUsersFormStatus: action.payload
            }
        }
        case Actions.UPDATE_SELECT_ROWS:{
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
        default:
            return state;
    }
};

export default usersReducer;