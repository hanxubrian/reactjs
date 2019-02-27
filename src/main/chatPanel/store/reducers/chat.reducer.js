import * as Actions from '../actions';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {CHANGE_TYPING_STATUS} from "../actions/chat.actions";

const initialState = {
    loading: true,
    currentUser :{},
    currentRoom: {},
    messages:[],
    rooms:[],
    dialog:[],
    typing:false,
    starttyping: false,
    ChatpanelStatu: false,
    usertypingstatus: [],
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
        case Actions.SET_TYPING_STATUS:{
            return{
                ...state,
                typing:true,
            }
        }
        case Actions.CHANGE_TYPING_STATUS:{
            return {
                ...state,
                starttyping:action.payload,
                usertypingstatus:action.typing,
            }
        }
        // case Actions.OPEN_CHAT_PANEL:
        // {
        //     return {
        //         ChatpanelStatu:true,
        //     }
        // }
        // case Actions.CLOSE_CHAT_PANEL:
        // {
        //     return {
        //         ChatpanelStatu:false,
        //     }
        // }
        default:
        {
            return state;
        }
    }
};

export default chat;
