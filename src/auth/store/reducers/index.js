import {combineReducers} from 'redux';
import user from './user.reducer';
import login from './login.reducer';
import register from './register.reducer';
import app from './app.reducer';

const authReducers = combineReducers({
    user,
    login,
    register,
    app
});

export default authReducers;