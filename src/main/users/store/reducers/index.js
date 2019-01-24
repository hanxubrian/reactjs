import {combineReducers} from 'redux';
import contacts from './contacts.reducer';
import user from './user.reducer';
import users from './users.reducer';

const contactReducer = combineReducers({
    contacts,
    user,
    users
});

export default contactReducer;
