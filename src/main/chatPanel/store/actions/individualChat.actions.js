import {chatService} from "services";

export const SET_INDIVIDUAL_CURRENT_ROOM_SUCCESS        = '[CHAT PANEL] SET CURRENT ROOMS';
export const SET_INDIVIDUAL_CURRENT_ROOM_FAIL           = '[CHAT PANEL] SET CURRENT ROOMS FAIL';

export function IndividualsetCurrentRoom(currentRoom){
    if(currentRoom && currentRoom !== null){
        return (dispatch)=>{
            dispatch({
                type    : SET_INDIVIDUAL_CURRENT_ROOM_SUCCESS,
                payload : currentRoom
            });
        }
    }else{
        return (dispatch)=>{
            dispatch({
                type    : SET_INDIVIDUAL_CURRENT_ROOM_FAIL,
                payload : false
            });
        }
    }

}



