import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    franchiseesDB: null,
    bLoadedFranchisees: false,
    bOpenedSummaryPanelFranchisees: false,
    bOpenedFilterPanelFranchisees: false,
    bOpenedMapView: false,
    statusId: 0,
    Location: "nearby",
    Longitude: "",
    Latitude: "",
    SearchText: "",
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
    },
    createFranchisees: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};


const franchisees = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_FRANCHISEES:
        {
            return {
                ...initialState,
                franchiseesDB: action.payload,
                bLoadedFranchisees: true,
            };
        }
        case Actions.TOGGLE_FILTER_PANEL_FRANCHISEES:
        {
            return {
                ...state, bOpenedFilterPanelFranchisees: !state.bOpenedFilterPanelFranchisees
            }
        }
        case Actions.TOGGLE_FILTER_STATUS_FRANCHISEES:{
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
        case Actions.CREATE_FRANCHISEES_LIST:
        {
            return {
                ...state,
                createFranchisees: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                },
                bOpenedSummaryPanelFranchisees: false,
                bOpenedFilterPanelFranchisees: true
            };
        }
        case Actions.CLOSE_CREATE_FRANCHISEES:
        {
            return {
                ...state,
                createFranchisees: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_FRANCHISEES_FORM:
        {
            return {
                ...state,
                createFranchisees: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_FRANCHISEES_FORM:
        {
            return {
                ...state,
                createFranchisees: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.TOGGLE_FRANCHISEE_MAP_VIEW:
        {
            return {
                ...state, bOpenedMapView: !state.bOpenedMapView
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