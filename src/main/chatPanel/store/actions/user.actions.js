import axios from 'axios/index';
import {chatService} from 'services'
import {initChat} from './chat.actions'
import {assignRooms} from './chat.actions'
import {getChatContacts} from './contacts.actions'

export const GET_USER_DATA = '[CHAT PANEL] GET USER DATA';

export function getUserData()
{
        return  (dispatch, getState) => {

            const userId = getState().auth.login.Username;
            const name = getState().auth.login.firstName ;
            const avatar = getState().auth.login.profilePhoto;

            return chatService.getUserData(userId, name, avatar).then((user) =>
			Promise.all([
				dispatch({
                    type   : GET_USER_DATA,
                    payload: user
                })
			]).then(() => dispatch(initChat())));
           
        }
}
export function updateUser(user)
{ 
    return (dispatch) =>{ 
        dispatch({
            type   : GET_USER_DATA,
            payload: user
        });
    }
}
export function getChatUserData()
{
    return  (dispatch, getState) => {

        const userId = getState().auth.login.Username;
        const name = getState().auth.login.firstName ;
        const avatar = getState().auth.user.data.photoURL;

        return chatService.getUserData(userId, name, avatar).then((user) =>
        Promise.all([
            dispatch({
                type   : GET_USER_DATA,
                payload: user
            })
        ]).then(() => dispatch(assignRooms(null))));
       
    }
}

export function checkChatUserData()
{
    return  (dispatch, getState) => {

        const userId = getState().auth.login.Username;
        const name = getState().auth.login.firstName ;
        const avatar = getState().auth.user.data.photoURL;
        const chatuser = getState().chatPanel.user;

        return chatService.getUserData(userId, name, avatar).then((user) =>{
            if (chatuser && chatuser.chatList.length !== user.chatList.length)
            {
                Promise.all([
                    dispatch({
                        type   : GET_USER_DATA,
                        payload: user
                    })
                ]).then(() => dispatch(assignRooms(null))).then(()=>{dispatch(getChatContacts())});
            }
        });
       
    }
}

