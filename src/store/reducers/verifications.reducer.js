import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {UPDATE_SELECTION_ROW_LENGTH} from "../actions";

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
    selectionLength: [],
};


const verifications = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_VERIFICATIONS:
        {
            return {
                ...state,
                verificationsDB: action.payload,
                bLoadedVerifications: true,
                bVerificationFetchStart: false
            };
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
                selectionLength: action.payload
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
    blacklist: ['verificationsDB']
};
export default persistReducer(persistConfig, verifications);
