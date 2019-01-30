import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
	ACC_payments: [],
	bLoadedPayments: false,
	bACC_fechStart: false,
	getPaymentsParam: {
		searchText: "",
		fromDate: "01/22/2019",
		toDate: "01/22/2019",
	},
	bOpenedSummaryPanel: false,
	bOpenedFilterPanel: false,

	searchText: "",

	bOpenPaymentDialog: false,
	activePaymentRows: [],

	isStartedPaymentsCreated: false,
	paymentsCreated: [],
	NoDataString: "Empty Data",

	errorInfo: {
		show: false,
		title: "",
		message: "",
	},
	filter: {
		paymentStatus: "All",
	},
	viewMode: "InvoiceView",
};


const accountReceivablePayments = function (state = initialState, action) {

	switch (action.type) {
		//
		// GET ALL PAYMENTS
		//
		case Actions.GET_ALL_RECEIVABLE_PAYMENTS:
			return {
				...state,
				ACC_payments: action.payload.Data,
				bACC_fechStart: false,
				bLoadedPayments: true,
			}
		case Actions.GET_ALL_RECEIVABLE_PAYMENTS_START:
			return {
				...state,
				bACC_fechStart: true
			}

		//
		// PAYMENT CREATE
		// 
		case Actions.CREATE_AR_PAYMENTS:
			return {
				...state,
				paymentsCreated: action.payload,
				isStartedPaymentsCreated: false,
			}
		case Actions.CREATE_AR_PAYMENTS_START:
			return {
				...state,
				isStartedPaymentsCreated: true,
			}
		case Actions.FAILED_GET_ALL_RECEIVABLE_PAYMENTS:
			return {
				...state,
				NoDataString: action.payload,
			}
		//
		// TOGGLE SIDE PANELS
		//
		case Actions.ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_FILTER_PANEL:
			return {
				...state, bOpenedFilterPanel: !state.bOpenedFilterPanel
			}
		case Actions.ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_SUMMARY_PANEL:
			return {
				...state, bOpenedSummaryPanel: !state.bOpenedSummaryPanel
			}
		//
		// SEARCH ACTION
		//
		case Actions.APPLY_SEARCH_TEXT_ARP:
			return {
				...state, searchText: action.payload
			}
		//
		// OPEN PAYMENT MODAL DIALOG
		//
		case Actions.OPEN_PAYMENT_DIALOG:
			return {
				...state, bOpenPaymentDialog: action.payload
			}
		//
		// SELECT PAYMENTS ON GRID
		//
		case Actions.SET_ACTIVE_PAYMENT_ROWS:
			return {
				...state, activePaymentRows: action.payload
			}
		//
		// SHOW ERROR DIALOG
		//
		case Actions.SHOW_ERROR_DIALOG:
			return {
				...state, errorInfo: action.payload
			}
		//
		// SET_PAYMENT_STATUS_FILTER
		//
		case Actions.SET_PAYMENT_STATUS_FILTER:
			return {
				...state,
				filter:
				{
					...state.filter,
					paymentStatus: action.payload
				}
			}
		//
		// SET_VIEW_MODE
		//
		case Actions.SET_VIEW_MODE:
			return {
				...state,
				viewMode: action.payload,
			}
		case UserActions.USER_LOGGED_OUT:
			return {
				...initialState
			}
		default:
			return state;
	}
};

const persistConfig = {
	key: 'account_receivable_payments',
	storage: storage,
	blacklist: ['ACC_payments', 'activePaymentRows']
};
export default persistReducer(persistConfig, accountReceivablePayments);