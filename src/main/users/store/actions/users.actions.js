import axios from 'axios/index';

export const OPEN_USERS_FORM = '[USERS APP] OPEN USERS FORM';

export function openUsersForm(openForm)
{
    console.log("open-Form", openForm);
    return {
        type      : OPEN_USERS_FORM,
        payload: openForm
    }
}
