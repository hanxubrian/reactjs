import axios from 'axios/index';
import {getUserData} from 'main/content/apps/contacts/store/actions/user.actions';
import {getChatUserData} from 'main/chatPanel//store/actions/user.actions';
import {getChatContacts} from 'main/chatPanel//store/actions/contacts.actions';
import {setselectedContactId} from 'main/chatPanel//store/actions/contacts.actions';
import {chatService} from 'services'
import {contactService} from 'services'

export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
export const SET_SEARCH_TEXT = '[CONTACTS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CONTACTS = '[CONTACTS APP] TOGGLE IN SELECTED CONTACTS';
export const SELECT_ALL_CONTACTS = '[CONTACTS APP] SELECT ALL CONTACTS';
export const DESELECT_ALL_CONTACTS = '[CONTACTS APP] DESELECT ALL CONTACTS';
export const OPEN_NEW_CONTACT_DIALOG = '[CONTACTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[CONTACTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[CONTACTS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[CONTACTS APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[CONTACTS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[CONTACTS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[CONTACTS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[CONTACTS APP] REMOVE CONTACTS';
export const TOGGLE_STARRED_CONTACT = '[CONTACTS APP] TOGGLE STARRED CONTACT';
export const TOGGLE_STARRED_CONTACTS = '[CONTACTS APP] TOGGLE STARRED CONTACTS';
export const SET_CONTACTS_STARRED = '[CONTACTS APP] SET CONTACTS STARRED ';


export const OPEN_CHAT_PANEL_START = '[CONTACTS APP] OPEN CHAT PANEL STARTED';
export const OPEN_CHAT_PANEL_END = '[CONTACTS APP] OPEN CHAT PANEL END';

export function getContacts(routeParams)
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
                // let response = await contactService.getRegisteredGroupUserList();
                let response = await chatService.getUserListforcontacts(data);
                let contacts = [];
                console.log('response.Data===',response.Data);
                response.Data.map((item)=>{
                    contacts= [...contacts,
                        {
                            id: item.UserId,
                            name: item.UserName,
                            firstName : item.FirstName,
                            lastName : item.LastName,
                            avatar : item.ProfilePhoto,
                            nickname : item.FirstName,
                            company: item.DepartmentName,
                            jobTitle: item.RoleName,
                            email : item.Email,
                            phone: item.Phone,
                            address : item.Address1 +' '+ item.Address2,
                            city : item.City,
                            state: item.State,
                            zipcode: item.Zipcode,
                            title: item.Title,
                            userType: item.UserType,
                            userTypeValue: item.UserTypeValue,
                            userValueNo: item.UserValueNo,
                            birthday: undefined,
                            notes: '',
                            region: item.Regions,
                            defaultRegion:item.DefaultRegionId,
                            outlookUsername: item.OutlookUsername,
                            roles: item.Roles,
                            groups: item.Groups,



                        } ]
                    

                });
                dispatch({
                    type   : GET_CONTACTS,
                    payload: contacts
                });
            })();
        }


}

export function checkChat()
{
    return  (dispatch, getState) => {
        
    }
}


export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedContacts(contactId)
{
    return {
        type: TOGGLE_IN_SELECTED_CONTACTS,
        contactId
    }
}


export function selectAllContacts()
{
    return {
        type: SELECT_ALL_CONTACTS
    }
}

export function deSelectAllContacts()
{
    return {
        type: DESELECT_ALL_CONTACTS
    }
}


export function openNewContactDialog()
{
    return {
        type: OPEN_NEW_CONTACT_DIALOG
    }
}

export function closeNewContactDialog()
{
    return {
        type: CLOSE_NEW_CONTACT_DIALOG
    }
}

export function openEditContactDialog(data)
{
    return {
        type: OPEN_EDIT_CONTACT_DIALOG,
        data
    }
}

export function closeEditContactDialog()
{
    return {
        type: CLOSE_EDIT_CONTACT_DIALOG
    }
}

export function addContact(newContact)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/add-contact', {
            newContact
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function updateContact(contact)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/update-contact', {
            contact
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function removeContact(contactId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/remove-contact', {
            contactId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACT
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function openChat(contactId)
{
    return (dispatch, getState) => {

        const contact = getState().contactsApp.contacts.entities[contactId];
        const id = getState().auth.login.Username;
        // const id = getState().auth.login.UserId;
        dispatch({
            type:OPEN_CHAT_PANEL_START,
        });
        (async () => {
                chatService.openChat(id, contact.name, contact.lastName, contact.avatar)
                    .then(()=>{
                        dispatch(getChatUserData())
                    })
                    .then(()=>{
                        dispatch(getChatContacts())
                    }).then(()=>{
                        dispatch({
                            type:OPEN_CHAT_PANEL_END,
                        });
                })
                }
            )();
           
        
    };
}

export function removeContacts(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/remove-contacts', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                })
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function toggleStarredContact(contactId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/toggle-starred-contact', {
            contactId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACT
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function toggleStarredContacts(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_CONTACTS
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function setContactsStarred(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/set-contacts-starred', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_CONTACTS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}

export function setContactsUnstarred(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().contactsApp.contacts;

        const request = axios.post('/api/contacts-app/set-contacts-unstarred', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_CONTACTS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_CONTACTS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getContacts(routeParams)))
        );
    };
}
