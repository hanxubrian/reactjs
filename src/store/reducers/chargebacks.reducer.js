import moment from "moment"

import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

let today = new Date();
const initialState = {
	chargebacksDB: null,
	chargebackStatus: [],
	chargebackDateOption: 3,
    chargebackDatePeriodMonth: moment().month(),
	chargebackDatePeriodYear: moment().year(),
	FromDate: moment("01/01/2018").format("MM/DD/YYYY"),
    ToDate: moment(today).format("MM/DD/YYYY"),
	bLoadedChargebacks: false,
	bChargebackStart: false,
	bChargebacksUpdated: false,
	bOpenedSummaryPanel: false,
	bOpenedFilterPanel: false,
	bOpenedMapView: false,
	// bChargebacksFetchStart: false,
	bStartingSaveFormData: false,
	regionId: 1,
    // statusId: [21, 24],
    // searchText: "",
    month: 12,
    year: 2018,
	transactionStatus: { checkedPaid: true, checkedPP: true, checkedComplete: true, checkedOpen: true },
	chargebackForm: {
		type: 'new',
		props: {
			open: false
		},
		data: null,
		franchisee: null
	},
	newChargeback: null,
	chargebackDetail: null,
	removedId: undefined,
	getChargebacksParam: {
		searchText: ""
	},

};


const chargebacks = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ALL_CHARGEBACKS:
			{
				return {
					...state,
					chargebacksDB: action.payload,
					bLoadedChargebacks: true,
					// bChargebacksFetchStart: false,
					bChargebackStart: false,
					bChargebacksUpdated: false
				};
			}
			case Actions.GET_CHARGEBACK_STATUS:
			{
				let chargebackStatus = action.payload;
				if(action.payload.length>0) {
					chargebackStatus = action.payload.map(iv => {
						return {['checked'+iv.TransactionStatusListId]: true, ...iv}
					});
				}
				return {
					...state, chargebackStatus: chargebackStatus
				}
			}
			case Actions.GET_CHARGEBACK_DETAIL:
			{
				return {
					...state,
					chargebackDetail: action.payload,
					bLoadedChargebacks: true,
					bChargebackStart: false
				}
			}
		case Actions.GET_CHARGEBACKS_FETCH_START:
			{
				return {
					...state,
					// bChargebacksFetchStart: true
					bChargebackStart: true
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
		case Actions.DELETE_SELECTED_CHARGEBACKS:
			{
				return { ...state, chargebacksDB: action.payload }

			}
		case Actions.REMOVE_SELECTED_CHARGEBACK:
			{
				return { ...state, removedId: action.payload }

			}
		case UserActions.USER_LOGGED_OUT:
			{
				return {
					...initialState
				}
			}
		case Actions.OPEN_NEW_CHARGEBACK_FORM:
			{
				return {
					...state,
					chargebackForm: {
						type: 'new',
						props: {
							open: true
						},
						data: null,
						franchisee: null
					}
				};
			}
		case Actions.CLOSE_NEW_CHARGEBACK_FORM:
			{
				return {
					...state,
					chargebackForm: {
						type: 'new',
						props: {
							open: false
						},
						data: null,
						franchisee: null
					},
					newChargeback: null,
                	chargebackDetail: null
				};
			}
		case Actions.OPEN_EDIT_CHARGEBACK_FORM:
			{
				return {
					...state,
					chargebackForm: {
						type: 'edit',
						props: {
							open: true
						},
						data: null,
						franchisee: null
					},
					bChargebackStart: false
				};
			}
		case Actions.CLOSE_EDIT_CHARGEBACK_FORM:
			{
				return {
					...state,
					chargebackForm: {
						type: 'edit',
						props: {
							open: false
						},
						data: null,
						franchisee: null
					},
					newChargeback: null,
					chargebackDetail: null
				};
			}
		case Actions.STARTING_SAVE_CHARGEBACK_FORM_DATA:
			{
				return {
					...state,
					bStartingSaveFormData: true
				}
			}
		case Actions.RESET_CHARGEBACK_FORM:
			{
				return {
					...state,
					bStartingSaveFormData: false,
					chargebackForm: {...state.chargebackForm, data: null, franchisee: null},
					newChargeback: null
				}
			}
		case Actions.SELECT_TRANSACTION_FRANCHISEE:
        {
            return {
                ...state,
                chargebackForm: {...state.chargebackForm, franchisee: action.payload}
            }
        }
		case Actions.UPDATE_CHARGEBACK_DATE_OPTION:
			{
				return {
					...state,
					chargebackDateOption: action.payload
				}
			}
		case Actions.ADD_CHARGEBACK:
		case Actions.UPDATE_A_CHARGEBACK:
        	{
            return {...state, newChargeback: action.payload}
        	}
        case Actions.UPDATED_CHARGEBACKS: {
            return {...state, bChargebacksUpdated: true, bChargebackStart: true}
        	}
		default:
			{
				return state;
			}
	}
};

const persistConfig = {
	key: 'chargebacks',
	storage: storage,
	blacklist: ['chargebacksDB', 'bChargebackStart', 'bOpenedSummaryPanel', 'bOpenedFilterPanel', 'bLoadedFranchisees', 'chargebackForm']
};
export default persistReducer(persistConfig, chargebacks);
