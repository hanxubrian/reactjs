import * as Actions from '../actions';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";



const initialState = {
    loading                     : true,
    status                      : false,
    individualChatcurrentRoom   : null,
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