import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import moment from "moment";
import {ADD_FRANCHISEE_OWNER_ROW} from "../actions/";

const initialState = {
    franchiseesDB: null,
    bLoadedFranchisees: false,
    bOpenedSummaryPanelFranchisees: false,
    bOpenedFilterPanelFranchisees: false,
    bOpenedMapView: false,
    statusId: 0,
    Longitude: "",
    Latitude: "",
    SearchText: "",
    franchiseeFilterList: null,
    bLoadedFilterList: false,
    franchiseeStatus: [],
    bFranchiseesFetchStart: false,
    planType: [],
    documentsList: [],
    franchiseeFees: [],
    Location: "all",
    StateList: [],
    transactionStatusFranchisees:{
        Active: true,
        Inactive: true,
        CTDB: true,
        Transfer: true,
        LegalCompliancePending: true,
        PendingTransfer: true,
        Terminated: true,
        Rejected: true,
        Pending: true,
        "Non-Renewed": true,
        Repurchased: true,
    },
    createFranchisees: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
    locationFilterValue: {
        id: "locationAll",
        miles: 15,
        addrZipcode: undefined
    },
    insertPayload: {
        RegionId: 2,
        Name: "",
        Addresses: [
            {
                Type: "Main",
                AddressLine1: "",
                AddressLine2: "",
                City: "",
                State: "",
                Zip: "",
                County: ""
            },
            {
                Type: "Legal",
                AddressLine1: "",
                AddressLine2: "",
                City: "",
                State: "",
                Zip: "",
                County: ""
            }
        ],
        Email: "",
        Phone1: "",
        Phone2: "",
        CheckPayee1: "",
        CheckPayee2: "",
        Owners: [],
        LegalId:"SSN",
        LegalIdNum: "57547120",
        DATE_1: "",
        DATE_2: "",
        AgreementPlanType: "B",
        AgreementPlanTypeid: 99,
        AgreementTerm: 20,
        AgreementDownPayment: 2850.00,
        AgreementPlanAmount: 9500.00,
        AgreementMonthlyPayment: 147.93,
        AgreementInterestRate: 12.00,
        AgreementPaymentBill: 31,
        AgreementTotalPayments: 60,
        AgreementDateSigned: moment(new Date()).format("MM/DD/YYYY"),
        AgreementLatestRenewDate: moment(new Date()).format("MM/DD/YYYY"),
        AgreementExpirationDate: moment(new Date()).format("MM/DD/YYYY"),
        AgreementInitialBusinessAmount: 1000.00,
        AgreementDaysToFulfill:200,
        MoralObligation: 0.00,
        CurrentBusiness: 0.00,
        Fees: [],
        AllowBppAdminFee: "Y",
        AllowChargeBack: "Y",
        AllowAccountRebate: "Y",
        AllowGenerateReport: "Y",
        Print1099: "Y",
        NameOn1099: "",
        PctFlag: "Y",
        AddPct: 3.00,
        Status: "Y",
        SecNote: "N",
        SecPBill: "15",
        TakeNote: "N",
        REBELIG: 1,
        NewFindersFee: 1,
        CURSTAT: "",
        CURSTATDT: "",
        Documents: []
    }
};


const franchisees = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ALL_FRANCHISEES:
        {
            return {
                ...state,
                franchiseesDB: action.payload,
                bLoadedFranchisees: true,
                bOpenedFilterPanelFranchisees: state.bOpenedFilterPanelFranchisees,
                bFranchiseesFetchStart: false
            };
        }
        case Actions.GET_FILTER_LIST:
        {
            let franchiseeStatus = action.payload;
            if(action.payload.length>0) {
                franchiseeStatus = action.payload.map(iv => {
                    return {[iv.Name]: true, ...iv}
                });
            }
            return{
                ...state,
                franchiseeStatus: franchiseeStatus,
                bLoadedFilterList: true
            }
        }
        case Actions.GET_FRANCHISEE_FORM_PLAN_TYPE:
        {
            return{
                ...state,
                planType: action.payload
            }
        }
        case Actions.GET_FRANCHISEE_DOCUMENTS_LIST:
        {
            let documentsList = action.payload;
            if(action.payload.length>0) {
                documentsList = action.payload.map(iv => {
                    return {
                        ["documentDateTime"+iv.FileTypeListId]: "",
                        ["documentFileSize"+iv.FileTypeListId]: "",
                        ["documentView"+iv.FileTypeListId]: "",
                        ...iv
                    }
                });
            }
            return{
                ...state,
                documentsList: documentsList
            }
        }
        case Actions.GET_FRANCHISEE_FEE:
        {
            let franchiseeFee = action.payload;
            if(action.payload.FranchiseeFees.length>0) {
                franchiseeFee = action.payload.FranchiseeFees.map(iv => {
                    return {
                        ["Deduct"+iv.FranchiseeFeeList.FranchiseeFeeListId]: true,
                        ...iv
                    }
                });
                action.payload.FranchiseeFees = franchiseeFee;
            }
          return{
              ...state,
              franchiseeFees: action.payload
          }
        }
        case Actions.TOGGLE_FILTER_PANEL_FRANCHISEES:
        {
            return {
                ...state, bOpenedFilterPanelFranchisees: !state.bOpenedFilterPanelFranchisees
            }
        }
        case Actions.UPDATE_FRANCHISEE_STATUS:{
            return {
                ...state, transactionStatusFranchisees:{...state.transactionStatusFranchisees,...action.payload}
            }
        }
        case Actions.UPDATE_FRANCHISEE_UPDATE_CHECKBOX:{
            return{
                ...state,
                franchiseeFees: action.payload
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
        case Actions.FRANCHISEE_SELECT_LOCATION_FILTER: {
            return {
                ...state, locationFilterValue: action.payload
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
        case Actions.UPDATE_DATE_SIGN_FRANCHISEE:
        {
            return {
                ...state, selectedSignDate: action.payload
            }
        }
        case Actions.UPDATE_RENEW_DATE_FRANCHISEE:
        {
            return {
                ...state, selectedRenewDate: action.payload
            }
        }
        case Actions.GET_FRANCHISEES_FETCH_START:
        {
            return {
                ...state,
                bFranchiseesFetchStart: true
            };
        }
        case Actions.UPDATE_EXP_DATE_FRANCHISEE:
        {
            return {
                ...state, selectedExpDate: action.payload
            }
        }
        case Actions.SELECTED_LOCATION:
        {
            return{
                ...state,
                Location: action.Location
            }
        }
        case Actions.UPLOAD_INSERT_PAYLOAD: {
            return{
                ...state,
                // insertPayload: action.payload,
                insertPayload:{...state.insertPayload,...action.payload}
            }
        }
        case Actions.GET_FRANCHISEE_STATE_LIST: {
            return{
                ...state,
                StateList: action.payload
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
    blacklist: ['franchiseesDB']
};
export default persistReducer(persistConfig, franchisees);