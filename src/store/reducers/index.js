import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'auth/store/reducers';
import quickPanel from 'main/quickPanel/store/reducers';
import calendarApp from '../../main/content/apps/calendar/store/reducers/';
import mailApp from '../../main/content/apps/mail/store/reducers/';
import chatPanel from '../../main/chatPanel/store/reducers/';
import contactsApp from '../../main/content/apps/contacts/store/reducers/';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        quickPanel,
        calendarApp,
        mailApp,
        chatPanel,
        contactsApp,
        ...asyncReducers
    });

export default createReducer;
