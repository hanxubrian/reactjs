import axios from 'axios/index';
import {setselectedContactId} from './contacts.actions';
import {closeMobileChatsSidebar} from 'main/content/apps/chat/store/actions/sidebars.actions';
import Chatkit from '@pusher/chatkit-client'

export const GET_CHAT = '[CHAT PANEL] GET CHAT';
export const REMOVE_CHAT = '[CHAT PANEL] REMOVE CHAT';
export const SEND_MESSAGE = '[CHAT PANEL] SEND MESSAGE';
export const CURRENT_USER = '[CHAT PANEL] CURRENT USER';
export const CURRENT_ROOM = '[CHAT PANEL] CURRENT ROOM';
export const ON_MESSAGE = '[CHAT PANEL] ON MESSAGE';


export function getChat(chatId, contactId)
{
    return (dispatch, getState) => {
         const {id: userId} = getState().chatPanel.user;
        /* const request = axios.get('/api/chat/get-chat', {
            contactId,
            userId
        });

        return request.then((response) => {

            dispatch(setselectedContactId(contactId));

            dispatch(closeMobileChatsSidebar());

            return dispatch({
                type        : GET_CHAT,
                chat        : response.data.chat,
                userChatData: response.data.userChatData
            });
        }); */

        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:e55a61d5-6a16-4a03-9ff0-5bdacd4f04ca',
            userId: userId,
            tokenProvider: new Chatkit.TokenProvider({
              url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e55a61d5-6a16-4a03-9ff0-5bdacd4f04ca/token',
            }),
          })

          chatManager
          .connect()
          .then(currentUser => {
            dispatch(setCurrentUser(currentUser))
            return currentUser.subscribeToRoom({
                roomId: "19381749",
                messageLimit: 100,
                hooks : {
                    onMessage: message=>{
                        return {
                            type : ON_MESSAGE,
                            data : message
                        }
                    },
                 
                },
            })
          })
          .then(currentRoom =>{
            dispatch(setCurrentRoom(currentRoom));
          })
          .catch(error => console.error('error', error))
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

export function sendMessage(messageText, chatId, userId)
{
    const message = {
        'who'    : userId,
        'message': messageText,
        'time'   : new Date()
    };

   

    return (dispatch, getState) =>{
        const currentUser = getState().chatPanel.chat.currentUser;
        const currentRoom = getState().chatPanel.chat.currentRoom;
        currentUser.sendMessage({
            text: messageText,
            roomId: currentRoom.id
        });
    }



       
     /*    (async () => {
            let contacts = await chatService.getContactList(userId);
            dispatch({
                type   : GET_CONTACTS,
                payload: contacts
            });
        })();
        request.then((response) => {
                return dispatch({
                    type        : SEND_MESSAGE,
                    message     : response.data.message,
                    userChatData: response.data.userChatData
                })
            }
        ); */
}