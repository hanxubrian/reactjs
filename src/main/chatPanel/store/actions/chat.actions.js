import {setselectedContactId} from './contacts.actions';
import {closeMobileChatsSidebar} from 'main/content/apps/chat/store/actions/sidebars.actions';
import Chatkit from '@pusher/chatkit-client'
import {chatService} from "services";
import _ from 'lodash';
import {updateContactsPresense} from './contacts.actions';
import {initContactsPresense} from  './contacts.actions';
import {addUnread} from  './contacts.actions';
import {initUnread} from  './contacts.actions';
import {updateUser} from './user.actions'
import {checkChatUserData} from './user.actions'

export const GET_CHAT           = '[CHAT PANEL] GET CHAT';
export const REMOVE_CHAT        = '[CHAT PANEL] REMOVE CHAT';
export const SEND_MESSAGE       = '[CHAT PANEL] SEND MESSAGE';
export const CURRENT_USER       = '[CHAT PANEL] CURRENT USER';
export const CURRENT_ROOM       = '[CHAT PANEL] CURRENT ROOM';
export const ON_MESSAGE         = '[CHAT PANEL] ON MESSAGE';
export const APPEND_MESSAGE     = '[CHAT PANEL] APPEND MESSAGE';
export const ADD_MESSAGE        = '[CHAT PANEL] ADD MESSAGE';
export const READ_MESSAGE       = '[CHAT PANEL] READ MESSAGE';
export const GET_ROOMS          = '[CHAT PANEL] GET ROOMS';

export const SET_TYPING_STATUS  = '[CHAT PANEL] SET TYPING STATUS';
export const CHANGE_TYPING_STATUS  = '[CHAT PANEL] CHANGE TYPING STATUS';


export function initChat()
{
    return (dispatch, getState) =>{
        const user = getState().chatPanel.user;
        const chat = getState().chatPanel.chat;
        if (user.id && chat)
        {
            const chatManager = new Chatkit.ChatManager({
                instanceLocator: 'v1:us1:e55a61d5-6a16-4a03-9ff0-5bdacd4f04ca',
                userId: user.id,
                tokenProvider: new Chatkit.TokenProvider({
                  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e55a61d5-6a16-4a03-9ff0-5bdacd4f04ca/token',
                }),
            })

            chatManager
            .connect()
            .then(currentUser => {
              dispatch(setCurrentUser(currentUser));
              dispatch(assignRooms(currentUser));
            })
        }

    }
}

export function assignRooms(currentUser)
{
    return (dispatch, getState) =>{
        const user = getState().chatPanel.user;
        const chat = getState().chatPanel.chat;
        const rooms = chat.rooms;
        if (currentUser === null)
        {
            currentUser = getState().chatPanel.chat.currentUser;
        }


        user.chatList.map((chat, i)=>{

            var room = rooms.find(_room=>_room.id === chat.chatId)
            if (!room){
                currentUser.subscribeToRoom({
                    roomId: chat.chatId,
                    messageLimit: 100,
                    hooks : {
                        onMessage: message=>{
                            const newmsg = {
                                'who'           : message.sender.id,
                                'message'       : message.text,
                                'time'          : message.createdAt,
                                'attachment'    : message.attachment,
                            };
                            if(message.text && message.text !==null)
                                return dispatch(addMessage(chat.chatId, newmsg))

                         },
                        onUserStartedTyping:user=>{
                            // console.log("onUserStartedTyping user",user);
                            return dispatch(updateStarttyping(user));

                        },
                        onUserStoppedTyping:user=>{
                            console.log("onUserStoppedTyping user",user);
                            return dispatch(reupdateStarttyping(user));
                        },
                         onPresenceChanged: (state, user) => {
                            return dispatch(updateContactsPresense(user, state));
                         }
                    }
                })
                .then(currentRoom =>{
                    dispatch(appendNewRoom(currentRoom));
                })
                .then(()=>{
                    dispatch(appendMessages(chat.chatId));
                })
                .catch(error => console.error('error', error))
            }
          }
          );

    };
}
export function reupdateStarttyping(user) {

    return(dispatch,getState)=>{

        let currentroom = getState().chatPanel.chat.currentRoom;
        let check = true;
        if(currentroom && currentroom !== null){
            let ids = currentroom.userIds;
            console.log("ids",ids);
            console.log("user",user);

            if(ids &&  ids.length){
                ids.map((item)=>{
                    if(item===user.id){
                        check = false;
                    }
                });
            }
        }
        dispatch({
            type: CHANGE_TYPING_STATUS,
            payload: false,
        });
        console.log("check untyping ",check);
        console.log('typing start user',check);
    }
}
export function updateStarttyping(user) {
    console.log('stop typing start user',user);
    return(dispatch,getState)=>{
        let currentroom = getState().chatPanel.chat.currentRoom;
        let typingstatus = getState().chatPanel.chat.usertypingstatus;
        let midtypingstatus=[];
        let check = false;
        let flag = false;
        midtypingstatus = typingstatus;
        if(currentroom && currentroom !== null){
            let ids = currentroom.userIds;
            // console.log("ids",ids);
            // console.log("user",user);
            // console.log("currentroom",currentroom);

            if(ids &&  ids.length){
                ids.map((item)=>{
                    if(item===user.id){
                        check = true;
                    }
                });
            }

            typingstatus.map((item)=>{
                if(item.id ===user.id){
                    item.typing = check;
                    flag = true ;
                    return ;
                }
            });
            midtypingstatus = typingstatus;
            if(!flag && check){
                let miditem = {};
                miditem.id = user.id;
                miditem.typing = true;
                midtypingstatus.push(miditem);
            }
            console.log("++++add typing status" , midtypingstatus);
        }
        console.log("check typing ",check);
        dispatch({
            type: CHANGE_TYPING_STATUS,
            payload: check,
            typing:midtypingstatus,
        });
        console.log('stop typing start user',user);
    }
}
export function checkChat()
{
    return  (dispatch) => {
        return dispatch(checkChatUserData());
    }
}

export function getChat(chatId, contactId)
{
    return async (dispatch, getState) => {
        const {id: userId} = getState().chatPanel.user;
        const chat = getState().chatPanel.chat;
        if (!chat)
            return;
        const user = getState().chatPanel.chat.currentUser;
        const rooms = getState().chatPanel.chat.rooms;
        const messages = getState().chatPanel.chat.messages;

        dispatch(setselectedContactId(contactId));
        dispatch(closeMobileChatsSidebar());
        dispatch(initContactsPresense(user));
        dispatch(initUnread(contactId));
        let room = rooms.find(_r =>_r.id === chatId);
        let msg = messages[chatId];

        if (room && msg)
        {
            dispatch(setCurrentRoom(room));
            dispatch(updateDialog(msg));
        }
        else{
            initChat();
        }
    }
}

export function insertChatMessage(newmsg)
{
    return {
        type : SEND_MESSAGE,
        message : newmsg
    }
}

export function updateDialog(newmsg)
{
    return {
        type : ON_MESSAGE,
        message : newmsg
    }
}

export function removeChat()
{
    return {
        type: REMOVE_CHAT
    };
}

export function setCurrentUser(currentUser)
{
    return {
        type: CURRENT_USER,
        data: currentUser
    };
}

export function setCurrentRoom(currentRoom)
{
    return {
        type: CURRENT_ROOM,
        data: currentRoom
    };
}

export function appendNewRoom(room)
{

    return  (dispatch, getState) => {
        const rooms = getState().chatPanel.chat.rooms;
        const contacts = getState().chatPanel.user.chatList;

        let loading = contacts.length - 1 !== rooms.length;

        dispatch({
            type: GET_ROOMS,
            data: room,
            loading : loading,
        })
    }


}

export function appendMessages(chatId)
{
    return  (dispatch, getState) => {
        const userId = getState().chatPanel.chat.currentUser.id;
        const user = getState().chatPanel.user;

        (async () => {
            let messages = await chatService.getMessages(chatId, userId);
            if (messages.length > 0)
            {
                let lastmsg = messages[messages.length - 1];
                user.chatList.map((item) => {
                    if(item.chatId === chatId)
                    {
                        item.lastMessageTime = lastmsg.time;
                    }
                });
            }

            dispatch({
                type   : APPEND_MESSAGE,
                data: {[chatId] : messages},

            });
            dispatch(updateUser(user));
        })();
    }
}

export function addMessage(roomId, message)
{

    return (dispatch, getState) => {
        const currentRoom = getState().chatPanel.chat.currentRoom;
        const loading = getState().chatPanel.chat.loading;
        const user = getState().chatPanel.user;
        const chatpanelstatus = getState().chatPanel.state;
        if (loading) return;
        let isthis;
        if (currentRoom && currentRoom.id == roomId){
            isthis = true;
            if (!loading && !chatpanelstatus && message.message && message.message !== null ){
                dispatch(addUnread(message.who));
            }
        }
        else{
            if (!loading && message.message && message.message !== null)
                dispatch(addUnread(message.who));
        }
        let messages = getState().chatPanel.chat.messages;

        if (messages === null || messages.length === 0)
        {
            messages = [];
            messages[roomId] = [message];
        }
        else{
            if(messages[roomId] && messages[roomId].length > 0)
                messages[roomId] = [...messages[roomId], message];
            else
                messages[roomId] = [message];
        }

        user.chatList.map((item) => {
                    if(item.chatId === roomId)
                    {
                        item.lastMessageTime = message.time;
                        return item;
                    }
                });


        return dispatch({
            type   : ADD_MESSAGE,
            data: messages,
            roomId: roomId,
            current: isthis,
        });
    }
}

export function getMessages()
{
    return  (dispatch, getState) => {
        const userId = getState().chatPanel.chat.currentUser.id;
        const roomId = getState().chatPanel.chat.currentRoom.id;
        (async () => {
            let messages = await chatService.getMessages(roomId, userId);
            dispatch({
                type   : ON_MESSAGE,
                message: messages
            });
        })();
    }
}


export function sendMessage(messageText, chatId, userId)
{
    return (dispatch, getState) =>{
        const currentUser = getState().chatPanel.chat.currentUser;
        const currentRoom = getState().chatPanel.chat.currentRoom;
        currentUser.sendMessage({
            text: messageText,
            roomId: currentRoom.id
        });

         /* const message = {
            'who'    : userId,
            'message': messageText,
            'time'   : new Date()
        };

        return (async () => {
            return dispatch({
                type        : SEND_MESSAGE,
                message     : message,
            })
        })();  */
    }

}

export function sendMsg(messageText, currentroom)
{
    return (dispatch, getState) =>{
        const currentUser = getState().chatPanel.chat.currentUser;
        const currentRoom = currentroom;
        currentUser.sendMessage({
            text: messageText,
            roomId: currentRoom.id,
            attachment: {
                link: "http://cataas.com/cat",
                type: "image"
            }
        });
    }

}

export function chatstarting() {
    return (dispatch,getState)=>{
        let currentuser = getState().chatPanel.chat.currentUser;
        let currentroom = getState().chatPanel.chat.currentRoom;
        let roomid ='';
        if(currentroom && currentroom !== null){
            roomid = currentroom.id;
        }
        if(currentuser && roomid){
            currentuser.isTypingIn({ roomId: roomid })
                .then(() => {
                    console.log('typing Success!')
                })
                .catch(err => {
                    console.log(`Error sending typing indicator: ${err}`)
                });
            dispatch({
                type:SET_TYPING_STATUS,
            })
        }
    }
}
