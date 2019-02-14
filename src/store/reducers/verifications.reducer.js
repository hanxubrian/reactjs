import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import moment from 'moment'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
    verificationsDB: null,
    bLoadedVerifications: false,
    bOpenedSummaryPanel: false,
    bOpenedFilterPanel: false,
    transactionStatus: { checkedPaid: true, checkedPP: true, checkedComplete: true, checkedOpen: true },
    verificationForm: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    statusId: 1,
    searchText: "",
    bVerificationFetchStart: false,
    aTransactionSelections: [],
    aInvoiceSelections: [],
    verifiedModal: false,
    reviseModal: false,
    rejectModal: false,
    fromDate:moment().date(1).format("MM/DD/YYYY"),
    toDate: moment().add(1,'months').endOf('month').format("MM/DD/YYYY"),
    verifyOption: 'transaction'
};


const verifications = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_PENDING_LISTS:
        {
            return {
                ...state,
                verificationsDB: action.payload,
                bLoadedVerifications: true,
                bVerificationFetchStart: false
            };
        }
        case Actions.GET_ALL_PENDING_LISTS_ERROR:
        {
            return {
                ...state,
                verificationsDB: null,
                bLoadedVerifications: true,
                bVerificationFetchStart: false
            };
        }
        case Actions.GET_STARTED_FETCHING_PENDING_LISTS:
        {
            return {
                ...state, bVerificationFetchStart: true
            }
        }
        case Actions.TOGGLE_VERIFICATION_FILTER_PANEL:
        {
            return {
                ...state, bOpenedFilterPanel: !state.bOpenedFilterPanel
            }
        }
        case Actions.TOGGLE_VERIFICATION_SUMMARY_PANEL:
        {
            return {
                ...state, bOpenedSummaryPanel: !state.bOpenedSummaryPanel
            }
        }
        case Actions.TOGGLE_VERIFICATION_FILTER_STATUS: {
            return {
                ...state, transactionStatus: { ...state.transactionStatus, ...action.payload }
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        case Actions.OPEN_NEW_VERIFICATION_FORM:
        {
            return {
                ...state,
                bOpenedFilterPanel: true,
                bOpenedSummaryPanel: false,
                verificationForm: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_VERIFICATION_FORM:
        {
            return {
                ...state,
                verificationForm: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.UPDATE_SELECTION_ROW_LENGTH:
        {
            return{
                ...state,
                aTransactionSelections: action.payload
            }
        }
        case Actions.UPDATE_INVOICE_SELECTIONS:
        {
            return{
                ...state,
                aInvoiceSelections: action.payload
            }
        }
        case Actions.OPEN_VERIFICATION_DIALOG:
        {
            return{
                ...state,
                verifiedModal: true,
            }
        }
        case Actions.CLOSE_VERIFICATION_DIALOG:
        {
            return{
                ...state,
                verifiedModal: false,
            }
        }
        case Actions.OPEN_CLOSE_REVISE_DIALOG:
        {
            return{
                ...state,
                reviseModal: action.payload,
            }
        }

        case Actions.OPEN_CLOSE_REJECT_DIALOG:
        {
            return{
                ...state,
                rejectModal: action.payload,
            }
        }
        case Actions.UPDATE_FROM_DATE_VERIFICATION:
        {
            return {
                ...state, fromDate: action.payload
            }
        }
        case Actions.UPDATE_TO_DATE_VERIFICATION:
        {
            return {
                ...state, toDate: action.payload
            }
        }
        case Actions.UPDATE_VERIFY_OPTION:
        {
            return {
                ...state, verifyOption: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
};

const persistConfig = {
    key: 'verifications',
    storage: storage,
    blacklist: ['verificationsDB', 'verificationForm', 'verifiedModal', 'reviseModal', 'rejectModal']
};
export default persistReducer(persistConfig, verifications);
