import * as Actions from '../actions';
import _ from '@lodash';
import {OPEN_CHAT_PANEL_START} from "../actions/contacts.actions";

const initialState = {
    entities          : [],
    searchText        : '',
    selectedContactIds: [],
    routeParams       : {},
    contactDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    openchatpanelstatus:false,
};

const contactsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CONTACTS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                routeParams: action.routeParams
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_IN_SELECTED_CONTACTS:
        {

            const contactId = action.contactId;

            let selectedContactIds = [...state.selectedContactIds];

            if ( selectedContactIds.find(id => id === contactId) !== undefined )
            {
                selectedContactIds = selectedContactIds.filter(id => id !== contactId);
            }
            else
            {
                selectedContactIds = [...selectedContactIds, contactId];
            }

            return {
                ...state,
                selectedContactIds: selectedContactIds
            };
        }
        case Actions.SELECT_ALL_CONTACTS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedContactIds = arr.map(contact => contact.id);

            return {
                ...state,
                selectedContactIds: selectedContactIds
            };
        }
        case Actions.DESELECT_ALL_CONTACTS:
        {
            return {
                ...state,
                selectedContactIds: []
            };
        }
        case Actions.OPEN_NEW_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'create',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'create',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_CHAT_PANEL_START:
        {
            return {
                ...state,
                openchatpanelstatus:true,
            }
        }
        case Actions.OPEN_CHAT_PANEL_END:
        {
            return {
                ...state,
                openchatpanelstatus:false,
            }
        }
        default:
        {
            return state;
        }
    }
};

export default contactsReducer;
