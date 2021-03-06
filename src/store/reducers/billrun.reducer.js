import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    billrunsDB                              : null,
    bLoadedBillruns                         : false,
    billruncreate                           : null,
    loadingstatus                           : false,
    billrunstatus                           : 10,
    billrundelete                           : null,
    billruninvoiceDetail                    : null,
    billruninvoiceDetailStatus              : false,
    billruninvoiceDetailStatusF             : false,

};


const billruns = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_BILLRUNS:
        {
            return {
                ...initialState,
                billrunsDB: action.payload, bLoadedBillruns: true,billrunstatus:10,
            };
        }
        case Actions.REMOVE_SELECTED_BILLRUN:
        {
            return {...state, billrunsDB: action.payload}

        }
        case Actions.CREATE_BILLRUN_SUCCESS:
        {
            let middb = state.billrunsDB;
            middb.unshift(action.payload.Data);
            // console.log("#########middb",middb);
            return {
                ...state,billruncreate: action.payload,loadingstatus: false,billrunstatus:200,

            }
        }
        case Actions.CREATE_BILLRUN_START:
        {
            return {
                ...state,loadingstatus: true,billrunstatus:100,
            }
        }
        case Actions.CREATE_BILLRUN_FAILD:
        {
            return {
                ...state,loadingstatus: false,billrunstatus:400,
            }
        }
        case Actions.GET_ALL_BILLRUN_START:
        {
            return {
                ...state,loadingstatus: true,billrunstatus:10,
            }
        }
        case Actions.GET_ALL_BILLRUN_SUCCESS:
        {
            return {
                ...state,billrunsDB: action.payload,loadingstatus: false,billrunstatus:10,
            }
        }
        case Actions.GET_ALL_BILLRUN_FAILD:
        {
            return {
                ...state,loadingstatus: false,billrunstatus:10,
            }
        }
        case Actions.CHANGE_BILLRUN_STATUS:{
            return {
                ...state,loadingstatus: false,billrunstatus:50,
            }
        }
        case Actions.DELETE_BILLRUN_SUCCESS:
        {
            let billrunNo = action.payload.billrunno;
            state.billrunsDB.map((item)=>{
                console.log("item==1",item);
                if(billrunNo && billrunNo === item.BillRunNo){
                    item.Status = "Deleted";
                }
            });
            return {
                ...state,billrundelete: true,loadingstatus: false,billrunstatus:10,
            }
        }
        case Actions.DELETE_BILLRUN_FAILD:
        {
            return {
                ...state,billrundelete: false,loadingstatus: false,billrunstatus:10,
            }
        }
        case Actions.DELETE_BILLRUN_START:
        {
            return {
                ...state,loadingstatus: true,
            }
        }
        case Actions.GET_BILLRUN_INVOICE_DETAIL_BILLRUN_START:
        {
            return {
                ...state,billruninvoiceDetailStatus: true,billruninvoiceDetailStatusF : false,billrunstatus:10,
            }
        }
        case Actions.GET_BILLRUN_INVOICE_DETAIL_BILLRUN_SUCCESS:
        {
            return {
                ...state,billruninvoiceDetail: action.payload,billruninvoiceDetailStatus: false,billruninvoiceDetailStatusF : true,billrunstatus:10,
            }
        }
        case Actions.GET_BILLRUN_INVOICE_DETAIL_BILLRUN_FAILD:
        {
            return {
                ...state,billruninvoiceDetailStatus: false,billruninvoiceDetailStatusF : false,billrunstatus:10,
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
};

const persistConfig = {
    key: 'billruns',
    storage: storage,
};
export default persistReducer(persistConfig, billruns);
