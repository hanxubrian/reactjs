import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    franchiseesDB: null,
    bLoadedFranchisees: false,
    bOpenedSummaryPanelFranchisees: true,
    bOpenedFilterPanelFranchisees: true,
    transactionStatusFranchisees:{
        checkedSelectAll: true,
        checkedActive: true,
        checkedInactive: true,
        checkedCTDB: true,
        checkedPendingTransfer: true,
        checkedLegalCompliancePending: true,
        checkedTransfer: true,
        checkedTerminated: true,
        checkedRejected: true,
        checkedPending: true,
        checkedNonRenewed: true,
        checkedRepurchased: true
    }
};


const franchisees = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_FRANCHISEES:
        {
            return {
                ...initialState,
                franchiseesDB: action.payload, bLoadedFranchisees: true
            };
        }
        case Actions.TOGGLE_FILTER_PANEL_FRANCHISEES:
        {
            return {
                ...state, bOpenedFilterPanelFranchisees: !state.bOpenedFilterPanelFranchisees
            }
        }
        case Actions.TOGGLE_FILTER_STATUS:{
            return {
                ...state, transactionStatusFranchisees:{...state.transactionStatusFranchisees,...action.payload}
            }
        }
        case Actions.TOGGLE_SUMMARY_PANEL_FRANCHISEES:
        {
            return {
                ...state, bOpenedSummaryPanelFranchisees: !state.bOpenedSummaryPanelFranchisees
            }
        }
        case Actions.DELETE_SELECTED_FRANCHISEES:
        {
            return {...state, franchiseesDB: action.payload}

        }
        case Actions.REMOVE_SELECTED_FRANCHISEES:
        {
            return {...state, franchiseesDB: action.payload}

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
};

const persistConfig = {
    key: 'franchise',
    storage: storage,
};
export default persistReducer(persistConfig, franchisees);