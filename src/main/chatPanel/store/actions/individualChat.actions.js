import {chatService} from "services";

export const SET_INDIVIDUAL_CURRENT_ROOM_SUCCESS        = '[CHAT PANEL] SET CURRENT ROOMS';
export const SET_INDIVIDUAL_CURRENT_ROOM_FAIL           = '[CHAT PANEL] SET CURRENT ROOMS FAIL';
export const DELETE_INDIVIDUAL_CURRENT_ROOM_SUCCESS     = '[CHAT PANEL] DELETE CURRENT ROOMS';

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
export function IndividualdeleteCurrentRoom(){
    return (dispatch)=>{
        dispatch({
            type    : DELETE_INDIVIDUAL_CURRENT_ROOM_SUCCESS,
        });
    }
}



