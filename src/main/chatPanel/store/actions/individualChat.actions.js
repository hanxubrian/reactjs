import {chatService} from "services";

export const SET_INDIVIDUAL_CURRENT_ROOM_SUCCESS        = '[CHAT PANEL] SET CURRENT ROOMS';
export const SET_INDIVIDUAL_CURRENT_ROOM_FAIL           = '[CHAT PANEL] SET CURRENT ROOMS FAIL';
export const DELETE_INDIVIDUAL_CURRENT_ROOM_SUCCESS     = '[CHAT PANEL] DELETE CURRENT ROOMS';
export const SET_NOTIFICATION_STATUS                    = '[CHAT PANEL] SET NOTIFICATION STATUS';
export const SET_CHATPANEL_SHOW_STATUS                  = '[CHAT PANEL] SET CHATPANEL SHOW STATUS';


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
export function chatnotificationstatus(){
    return (dispatch)=>{
        dispatch({
            type    : SET_NOTIFICATION_STATUS,
        });
    }
}
export  function changechatpanelshowstatus () {
    console.log("**************************************************************changechatpanelshowstatus")
    return (dispatch)=>{
        dispatch({
            type    : SET_CHATPANEL_SHOW_STATUS,
        });
    }
}




