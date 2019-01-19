import * as Actions from '../actions';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {SET_CHATPANEL_SHOW_STATUS, SET_NOTIFICATION_STATUS} from "../actions/individualChat.actions";



const initialState = {
    loading                     : true,
    status                      : false,
    individualChatcurrentRoom   : null,
    chatnotificationstatus      : false,
    chatpanelshowstatus         : true,
};
const IndividualChat = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_INDIVIDUAL_CURRENT_ROOM_SUCCESS:
        {
            return {...state,
                individualChatcurrentRoom: action.payload,status: true
            }
        }
        case Actions.SET_INDIVIDUAL_CURRENT_ROOM_FAIL:
        {
            return {...state, status: false}
        }
        case Actions.DELETE_INDIVIDUAL_CURRENT_ROOM_SUCCESS:
        {
            return {...state,
                individualChatcurrentRoom: null,status: true
            }
        }
        case Actions.SET_NOTIFICATION_STATUS:
        {
            return {...state,
                chatnotificationstatus: !state.chatnotificationstatus,status: true
            }
        }
        case Actions.SET_CHATPANEL_SHOW_STATUS:
        {
            return {
                chatpanelshowstatus: !state.chatpanelshowstatus,
            }
        }
        default:
        {
            return state
        }
    }
};
const persistConfig = {
    key: 'individualChat',
    storage: storage,
};
// export default IndividualChatReducer;
export default persistReducer(persistConfig, IndividualChat);