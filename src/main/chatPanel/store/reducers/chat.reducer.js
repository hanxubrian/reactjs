import * as Actions from '../actions';


const initialState = {
    loading: true,
    currentUser :{},
    currentRoom: {},
    messages:[],
    rooms:[],
    dialog:[],
};

const chat = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CHAT:
        {
            return {
                ...state
            };
        }
        case Actions.REMOVE_CHAT:
        {
            return {...state};
        }
        case Actions.CURRENT_USER:
        {
            return {
                ...state,
                currentUser : action.data,
                
            }
        }
        case Actions.CURRENT_ROOM:
        {
            return {
                ...state,
                currentRoom : action.data,
            }
        }
        case Actions.GET_ROOMS:
        {
            return {
                ...state,
                rooms : [
                    ...state.rooms,
                    action.data
                ],
                loading : action.loading
            }
        }
        case Actions.ADD_MESSAGE:
        {
           if(action.current){
            return {
                ...state,
                messages : action.data,
                dialog: action.data[action.roomId]
            }
           }
            else{
                return {
                    ...state,
                    messages : action.data
                }
            }
        }
        case Actions.APPEND_MESSAGE:
        {
            
            return {
                ...state,
                messages : {...state.messages, ...action.data}
            }
        }

        case Actions.ON_MESSAGE:
        {
            return {
                ...state,
                dialog : action.message
            }
        }
        case Actions.SEND_MESSAGE:
        {
            return {
                ...state,
                dialog: [
                    ...state.dialog,
                    action.message
                ]

            };
        }
        default:
        {
            return state;
        }
    }
};

export default chat;