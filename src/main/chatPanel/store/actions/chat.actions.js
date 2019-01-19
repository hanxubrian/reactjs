import axios from 'axios/index';
import {setselectedContactId} from './contacts.actions';
import {closeMobileChatsSidebar} from 'main/content/apps/chat/store/actions/sidebars.actions';
import Chatkit from '@pusher/chatkit-client'
import {chatService} from "services";
import {updateContactsPresense} from './contacts.actions';
import {initContactsPresense} from  './contacts.actions';
import {addUnread} from  './contacts.actions';
import {initUnread} from  './contacts.actions';
import {updateUser} from './user.actions'
import {checkChatUserData} from './user.actions'
import _ from '@lodash';

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
                           
                            return dispatch(addMessage(chat.chatId, newmsg)) 
                        
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
 
        dispatch( {
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

        if (loading) return;
        let isthis;
        if (currentRoom && currentRoom.id == roomId)
            isthis = true;
        else{
            if (!loading)
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