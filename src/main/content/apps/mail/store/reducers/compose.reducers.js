import * as Actions from '../actions';
import * as UserActions from "../../../../../../auth/store/actions";

const initialState = {
    toggleCompose: false,
    sendMail: {
        Subject: '',
        ContentBody: '',
        Recipients: ''
    }
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
        case Actions.UPDATE_MAIL_PAYLOAD:
        {
            return{
                ...state,
                sendMail: action.payload
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

export default compose;
