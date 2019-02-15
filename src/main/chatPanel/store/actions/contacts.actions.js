import {chatService} from "services";

export const GET_CONTACTS = '[CHAT PANEL] GET CONTACTS';
export const SET_SELECTED_CONTACT_ID = '[CHAT PANEL] SET SELECTED CONTACT ID';
export const REMOVE_SELECTED_CONTACT_ID = '[CHAT PANEL] REMOVE SELECTED CONTACT ID';

export function getContacts()
{
    return  (dispatch, getState) => {
        const userId = getState().auth.login.Username;
        const regionId = getState().auth.login.defaultRegionId;
        const data = {
            regionId: regionId,
            Groups: [],
            Roles: [],
            searchText: ""
        };
        (async () => {
            // let contacts = await chatService.getUserListforcontacts(data);
            // console.log("contacts.actons==",contacts);
            // if (contacts.IsSuccess)
            // {
            //     dispatch({
            //         type   : GET_CONTACTS,
            //         payload: contacts.Data
            //     });
            // }

            let contacts = await chatService.getContactList(userId);
            if (contacts)
            {
                dispatch({
                    type   : GET_CONTACTS,
                    payload: contacts
                });
            }

        })();
    }
}
export function initContactsPresense(currentUser)
{
    return (dispatch, getState) => {
        const contacts = getState().chatPanel.contacts.entities;

        contacts.map((item, i) => {
            item.status = currentUser.presenceStore.store[item.id];
            return item;
        });

        (async () => {
            dispatch({
                type   : GET_CONTACTS,
                payload: contacts
            });
        })();
    }
}

export function updateContactsPresense(user, state)
{
    return (dispatch, getState) => {
        const contacts = getState().chatPanel.contacts.entities;

        contacts.map((item, i) => {
            if (item.id === user.id)
            {
                item.status = state.current;
                return
            }
        });

        (async () => {
            dispatch({
                type   : GET_CONTACTS,
                payload: contacts
            });
        })();
    }
}

export function addUnread(userId)
{
    console.log("addUnread");
    return (dispatch, getState) => {
        const contacts = getState().chatPanel.contacts.entities;

        contacts.map((item, i) => {
            if (item.id === userId)
            {

                if (item.unread === undefined || item.unread === 0)
                    item.unread = 1;
                else
                    item.unread = item.unread + 1;
            }
        });

        (async () => {
            dispatch({
                type   : GET_CONTACTS,
                payload: contacts
            });
        })();
    }
}

export function initUnread(userId)
{
    return (dispatch, getState) => {
        const contacts = getState().chatPanel.contacts.entities;

        contacts.map((item, i) => {
            if (item.id === userId)
            {
                item.unread = 0;
            }
        });

        (async () => {
            dispatch({
                type   : GET_CONTACTS,
                payload: contacts
            });
        })();
    }
}


export function getChatContacts()
{
    return  (dispatch, getState) => {
        const userId = getState().auth.login.Username;
        (async () => {
            let contacts = await chatService.getContactList(userId);
            if (contacts){
                dispatch({
                    type   : GET_CONTACTS,
                    payload: contacts
                });
            }

        })();
    }
}

export function setselectedContactId(contactId)
{
    return {
        type   : SET_SELECTED_CONTACT_ID,
        payload: contactId
    }
}

export function removeSelectedContactId()
{
    return {
        type: REMOVE_SELECTED_CONTACT_ID
    }
}
