import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import moment from "moment";


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
    findersFees: [],
    Location: "all",
    detailPayload: null,
    eidtPayload: null,
    createPayload: null,
    deletePayload: null,
    Active: true,
    InActive: true,
    docSendModal: false,
    docViewModal: false,
    stopReasonModal: false,
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
        AddressLine2: "",
        Latitude: "",
        Longitude: "",
        Phone2: "+1(  )    -    ",
        AgreementPlanTypeId: "A",
        LegalName: "",
        LegalAddressLine1: "",
        LegalAddressLine2: "",
        LegalCity: "",
        LegalCounty: "",
        LegalState: "",
        LegalZip: "",
        LegalId: "ein",
        LegalIdNum: 0,
        AgreementInitialBusinessAmount: 4000,
        AgreementDaysToFulfill: 120,
        AllowAccountRebate: "Y",
        AllowGenerateReport: "Y",
        company_no: "",
        dlr_code: "",
        control_no: "",
        Name: "",
        AddressLine1: "",
        City: "",
        County: "",
        State: "",
        Zip: "",
        CheckPayee1: "",
        CheckPayee2: "",
        Phone1: "+1(  )    -    ",
        dlr_pager: "",
        ssn: "",
        AgreementPlanAmount: 8600.00,
        AgreementMonthlyPayment: 250,
        business: 0,
        DATE_1: "",
        DATE_2: "",
        AgreementDateSigned: moment(new Date()).format("MM/DD/YYYY"),
        fed_id: "",
        health_amt: 0,
        AgreementInterestRate: 0.00,
        min_sales: 0,
        AgreementPaymentBill: 0,
        AgreementTotalPayment: 48,
        PctFlag: "",
        AddPct: 0,
        Status: "Y",
        num_beeps: 0,
        beep_cost: 0,
        num_beeps2: 0,
        beep_cost2: 52.1,
        SecNote: "",
        sec_date: "",
        sec_amount: 0,
        sec_pymnt: 0,
        sec_int: 0,
        SecPBill: 0,
        sec_pytotl: "",
        TakeNote: "",
        inittot: 0,
        initcur: 0,
        AgreementPlanType: "E-4",
        initdate: "",
        ffcredit: 0,
        AgreementDownPayment: 2000.00,
        obl_begin: "",
        obl_end: "",
        leg_obg: 0,
        MoralObligation: 0,
        CurrentBusiness: 0,
        oper_mgr: "",
        REBELIG: "",
        rebbal: 0,
        NewFindersFee: "",
        ffdate: "",
        ded_ad: "",
        ad_cur: 0,
        ad_max: 0,
        callbdate: "",
        Email: "",
        dlr_id: "",
        AllowChargeBack: "Y",
        Print1099: "Y",
        NameOn1099: "",
        royalty: 0,
        AllowBppAdminFee: "Y",
        AgreementLatestRenewDate: moment(new Date()).format("MM/DD/YYYY"),
        AgreementTerm: 0,
        AgreementExpirationDate: moment(new Date()).format("MM/DD/YYYY"),
        contact: "",
        tech_pct: 0,
        ded_tech: "",
        CURSTAT: "",
        CURSTATDT: "",
        Owners: [],
        Fees: [],
        Documents: [],
    },
    reportPeriod: "01/2017" ,
    stateList: []

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
        case Actions.CREATE_FRANCHISEE:
        {
            return {
                ...state,
                insertPayload: initialState.insertPayload,
                createFranchisees: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                },
                createPayload: action.payload
            };
        }
        case Actions.GET_FRANCHISEE_DETAIL:
        {
            return {
                ...state,
                insertPayload: action.payload.Data,
                createFranchisees: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : null
                },
                bOpenedFilterPanelFranchisees: true
            };
        }
        case Actions.UPDATE_FRANCHISEE:
        {
            return {
                ...state,
                eidtPayload: action.payload,
                createFranchisees: {
                    type : 'close',
                    props: {
                        open: false
                    },
                    data : null
                },
                insertPayload: initialState.insertPayload,
            };
        }
        case Actions.DELETE_FRANCHISEE:
        {
            return {
                ...state,
                deletePayload: action.payload,
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
            return{
                ...state,
                documentsList: documentsList
            }
        }
        case Actions.GET_FRANCHISEE_FEE:
        {
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
        case Actions.UPDATE_FRANCHISEE_STATUS_ACTIVE:{
            return {
                ...state, Active: action.payload
            }
        }
        case Actions.UPDATE_FRANCHISEE_STATUS_INACTIVE:{
            return {
                ...state, InActive: action.payload
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
                },
                insertPayload: initialState.insertPayload
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
                stateList: action.payload
            }
        }
        case Actions.UPDATE_REPORT_PERIOD: {
            return{
                ...state,
                reportPeriod: action.payload
            }
        }
        case Actions.OPEN_CLOSE_DOC_SEND_ACTION_DIALOG:{
            return{
                ...state,
                docSendModal: action.payload
            }
        }
        case Actions.OPEN_CLOSE_DOC_VIEW_ACTION_DIALOG: {
            return{
                ...state,
                docViewModal: action.payload
            }
        }
        case Actions.GET_FINDERS_FEES_BY_FRANCHISEENO: {
            return{
                ...state,
                findersFees: action.payload
            }
        }
        case Actions.OPEN_CLOSE_STOP_REASON_DIALOG: {
            return{
                ...state,
                stopReasonModal: action.payload
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
    blacklist: ['franchiseesDB','transactionStatusFranchisees']
};
export default persistReducer(persistConfig, franchisees);
