import * as Actions from '../actions';
import * as UserActions from "../../../../../../auth/store/actions";

const initialState = {
    toggleCompose: false,
    sendMail: {
        Subject: '',
        ContentBody: '',
        Recipients: ''
    },
    sendResultSuccess: false,
    sendResultError: false
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
        case Actions.SEND_MAIL:
        {
            let tempSuccess = false;
            let tempError = false;
            if(action.payload.IsSuccess){
                tempSuccess = true;
            }else{
                tempError = true;
            }
            return {
                ...state,
                sendResultSuccess: tempSuccess,
                sendResultError: tempError
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
