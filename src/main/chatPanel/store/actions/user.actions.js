import axios from 'axios/index';
import {chatService} from 'services'

export const GET_USER_DATA = '[CHAT PANEL] GET USER DATA';

export function getUserData()
{
    const request = axios.get('/api/chat/user');

  /*   return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USER_DATA,
                payload: response.data
            })
        ); */

        return  (dispatch, getState) => {

            const userId = getState().auth.login.Username;
            const name = getState().auth.login.firstName ;
            const avatar = getState().auth.user.data.photoURL;
            (async () => {
                let user = await chatService.getUserData(userId, name, avatar);
                dispatch({
                    type   : GET_USER_DATA,
                    payload: user
                });
            })();
        }
}
