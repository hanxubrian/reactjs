import moment from "moment"

import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

let today = new Date();
const initialState = {
	leasesDB: null,
	leaseStatus: [],
	leaseDateOption: 3,
    leaseDatePeriodMonth: moment().month(),
	leaseDatePeriodYear: moment().year(),
	FromDate: moment("01/01/2018").format("MM/DD/YYYY"),
    ToDate: moment(today).format("MM/DD/YYYY"),
	bLoadedLeases: false,
	bLeaseStart: false,
	bLeasesUpdated: false,
	bOpenedSummaryPanel: false,
	bOpenedFilterPanel: false,
	bOpenedMapView: false,
	// bLeasesFetchStart: false,
	bStartingSaveFormData: false,
	regionId: [2, 24],
    statusId: [21, 24],
    searchText: "",
	transactionStatus: { checkedPaid: true, checkedPP: true, checkedComplete: true, checkedOpen: true },
	leaseForm: {
		type: 'new',
		props: {
			open: false
		},
		data: null,
		franchisee: null,
		lease: null
	},
	newLease: null,
	leaseDetail: null,
	removedId: undefined,
	getLeasesParam: {
		searchText: ""
	},

};


const leases = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ALL_LEASES:
			{
				return {
					...state,
					leasesDB: action.payload,
					bLoadedLeases: true,
					// bLeasesFetchStart: false,
					bLeaseStart: false,
					bLeasesUpdated: false
				};
			}
			case Actions.GET_LEASE_STATUS:
			{
				let leaseStatus = action.payload;
				if(action.payload.length>0) {
					leaseStatus = action.payload.map(iv => {
						return {['checked'+iv.TransactionStatusListId]: true, ...iv}
					});
				}
				return {
					...state, leaseStatus: leaseStatus
				}
			}
			case Actions.GET_LEASE_DETAIL:
			{
				return {
					...state,
					leaseDetail: action.payload,
					bLoadedLeases: true,
					bLeaseStart: false
				}
			}
		case Actions.GET_LEASES_FETCH_START:
			{
				return {
					...state,
					// bLeasesFetchStart: true
					bLeaseStart: true
				};
			}
		case Actions.APPLY_SEARCH_TEXT_ARP: {
			return {
				...state, searchText: action.payload
			}
		}
		case Actions.TOGGLE_FILTER_PANEL:
			{
				return {
					...state, bOpenedFilterPanel: !state.bOpenedFilterPanel
				}
			}
		case Actions.TOGGLE_SUMMARY_PANEL:
			{
				return {
					...state, bOpenedSummaryPanel: !state.bOpenedSummaryPanel
				}
			}
		case Actions.TOGGLE_MAP_VIEW:
			{
				return {
					...state, bOpenedMapView: !state.bOpenedMapView
				}
			}
		case Actions.TOGGLE_FILTER_STATUS: {
			return {
				...state, transactionStatus: { ...state.transactionStatus, ...action.payload }
			}
		}
		case Actions.DELETE_SELECTED_LEASES:
			{
				return { ...state, leasesDB: action.payload }

			}
		case Actions.REMOVE_SELECTED_LEASE:
			{
				return { ...state, removedId: action.payload }

			}
		case UserActions.USER_LOGGED_OUT:
			{
				return {
					...initialState
				}
			}
		case Actions.SELECT_LEASE:
			{
				return {
					...state,
					invoiceForm: {...state.invoiceForm, lease: action.payload}
				}
			}
		case Actions.OPEN_NEW_LEASE_FORM:
			{
				return {
					...state,
					leaseForm: {
						type: 'new',
						props: {
							open: true
						},
						data: null,
						franchisee: null
					}
				};
			}
		case Actions.CLOSE_NEW_LEASE_FORM:
			{
				return {
					...state,
					leaseForm: {
						type: 'new',
						props: {
							open: false
						},
						data: null,
						franchisee: null
					},
					newLease: null,
                	leaseDetail: null
				};
			}
		case Actions.OPEN_EDIT_LEASE_FORM:
			{
				return {
					...state,
					leaseForm: {
						type: 'edit',
						props: {
							open: true
						},
						data: null,
						franchisee: null
					},
					bLeaseStart: false
				};
			}
		case Actions.CLOSE_EDIT_LEASE_FORM:
			{
				return {
					...state,
					leaseForm: {
						type: 'edit',
						props: {
							open: false
						},
						data: null,
						franchisee: null
					},
					newLease: null,
					leaseDetail: null
				};
			}
		case Actions.STARTING_SAVE_LEASE_FORM_DATA:
			{
				return {
					...state,
					bStartingSaveFormData: true
				}
			}
		case Actions.RESET_LEASE_FORM:
			{
				return {
					...state,
					bStartingSaveFormData: false,
					leaseForm: {...state.leaseForm, data: null, franchisee: null},
					newLease: null
				}
			}
		case Actions.SELECT_TRANSACTION_FRANCHISEE:
        {
            return {
                ...state,
                leaseForm: {...state.leaseForm, franchisee: action.payload}
            }
        }
		case Actions.UPDATE_LEASE_DATE_OPTION:
			{
				return {
					...state,
					leaseDateOption: action.payload
				}
			}
		case Actions.ADD_LEASE:
		case Actions.UPDATE_A_LEASE:
        	{
            return {...state, newLease: action.payload}
        	}
        case Actions.UPDATED_LEASES: {
            return {...state, bLeasesUpdated: true, bLeaseStart: true}
        	}
		default:
			{
				return state;
			}
	}
};

const persistConfig = {
	key: 'leases',
	storage: storage,
	blacklist: ['leasesDB', 'bLeaseStart', 'bOpenedSummaryPanel', 'bOpenedFilterPanel', 'bLoadedFranchisees', 'leaseForm']
};
export default persistReducer(persistConfig, leases);
