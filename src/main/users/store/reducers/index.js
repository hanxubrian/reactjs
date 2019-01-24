import {combineReducers} from 'redux';
import contacts from './contacts.reducer';
import user from './user.reducer';

const contactReducer = combineReducers({
    contacts,
    user
});

export default contactReducer;
