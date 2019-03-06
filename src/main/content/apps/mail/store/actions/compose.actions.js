import {mailService} from "../../../../../../services";
export const TOGGLE_COMPOSE = '[MAIL APP] TOGGLE COMPOSE';
export const SEND_MAIL = '[MAIL APP] SEND MAIL';
export const UPDATE_MAIL_PAYLOAD = '[MAIL APP] UPDATE MAIL PAYLOAD';

export function toggleCompose(param)
{
    return {
        type: TOGGLE_COMPOSE,
        payload: param
    }
}

export function updatePayload(param){
    return {
        type: UPDATE_MAIL_PAYLOAD,
        payload: param
    }
}

export function sendMail(data,userId) {
    console.log("data",data);
   return(dispatch) => {
        (async () => {
            let res = await mailService.sendEmail(data,userId);
            dispatch({
               type: SEND_MAIL,
               payload: res
            });

        })();
   }
}