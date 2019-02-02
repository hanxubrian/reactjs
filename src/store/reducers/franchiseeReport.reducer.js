import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import moment from "moment";
import {ADD_FRANCHISEE_OWNER_ROW} from "../actions/";


const initialState = {
    franchiseeReportDB          : null,
    loading                     : false,
}

const franchiseeReportDatalist = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FRANCHISEE_REPORT_DATA_LIST_START:{
            return {
                ...state,
                loading:true,
            }
        }
        case Actions.GET_FRANCHISEE_REPORT_DATA_LIST_SUCCESS:{
            return {
                ...state,
                loading:false,
                franchiseeReportDB: action.payload,
            }
        }
        case Actions.GET_FRANCHISEE_REPORT_DATA_LIST_FAILED:{
            return {
                ...state,
                loading:false,franchiseeReportDB:null,
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        default:
        {
            return state;
        }
    }
}
export default franchiseeReportDatalist;