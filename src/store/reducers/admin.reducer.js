import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
    adminImport             :           null,
    adminImportLoading      :           false,
};

const admin = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.IMPORT_NOTIFICATION_START:{
            return{
                ...state,adminImportLoading:true,
            }
        }
        case Actions.IMPORT_NOTIFICATION_SUCCESS:{
            return{
                ...state,adminImport:action.payload,adminImportLoading:false,
            }
        }
        case Actions.IMPORT_NOTIFICATION_FAILD:{
            return{
                ...state,adminImportLoading:false,
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState,
            }
        }

        default:
        {
            return state;
        }
    }
}
const persistConfig = {
    key: 'admin',
    storage: storage,
};
export default persistReducer(persistConfig, admin);