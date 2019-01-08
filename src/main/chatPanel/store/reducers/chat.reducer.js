import * as Actions from '../actions';


const initialState = {
    currentUser :{},
    currentRoom: {},
    messages:[],
};

const chat = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CHAT:
        {
            return {
                //...action.chat
            };
        }
        case Actions.REMOVE_CHAT:
        {
            return null;
        }
        case Actions.CURRENT_USER:
        {
            return {
                ...state,
                currentUser : action.data
            }
        }
        case Actions.CURRENT_ROOM:
        {
            return {
                ...state,
                currentRoom : action.data
            }
        }
        case Actions.ON_MESSAGE:
        {
            return {
                ...state,
                messages : [...state.messages, action.message]
            }
        }
        case Actions.SEND_MESSAGE:
        {
            return {
                //...state,
                //dialog: [
                //    ...state.dialog,
                //    action.message
                //]

            };
        }
        default:
        {
            return state;
        }
    }
};

export default chat;