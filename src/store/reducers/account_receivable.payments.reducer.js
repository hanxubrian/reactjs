import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
	ACC_payments: [],
	bLoadedPayments: false,
	bACC_fechStart: false,
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
	filterParam: {
		paymentStatus: ["Open"],
		paymentHistoryTypes: [
			"Check", "CreditCard", "EFT", "Lockbox", "CreditFromOverpayment", "ManualCreditCard"
		],
		searchText: "",
		fromDate: "01/22/2019",
		toDate: "01/22/2019",
	},
	viewMode: "Invoice",
	isCustomerNameNoGrouping: true,


	paymentDlgPayloads: {
		open: false,
		paymentType: "Check",
		paymentAmount: 0
	},

	startPaymentHistory: false,
	bLoadedPaymentHistory: false,
	paymentHistory: [],

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
				activePaymentRows: [],
			}
		case Actions.GET_ALL_RECEIVABLE_PAYMENTS_START:
			return {
				...state,
				bACC_fechStart: true
			}
		case Actions.FAILED_GET_ALL_RECEIVABLE_PAYMENTS:
			return {
				...state,
				NoDataString: action.payload,
				bACC_fechStart: false,
			}
		//
		// GET PAYMENT HISTORY
		//
		case Actions.GET_PAYMENT_HISTORY:
			return {
				...state,
				paymentHistory: action.payload,
				startPaymentHistory: false,
				bLoadedPaymentHistory: true,
			}
		case Actions.GET_PAYMENT_HISTORY_START:
			return {
				...state,
				startPaymentHistory: true
			}
		case Actions.GET_PAYMENT_HISTORY_FAILED:
			return {
				...state,
				NoDataString: action.payload,
				startPaymentHistory: false
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
				...state,
				searchText: action.payload,
				activePaymentRows: [],
			}
		//
		// OPEN PAYMENT MODAL DIALOG
		//
		case Actions.OPEN_PAYMENT_DIALOG:
			return {
				...state,
				paymentDlgPayloads: {
					...state.paymentDlgPayloads,
					...action.payload
				}
			}
		//
		// SELECT PAYMENTS ON GRID
		//
		case Actions.SET_ACTIVE_PAYMENT_ROWS:
			return {
				...state,
				activePaymentRows: action.payload
			}
		//
		// SHOW ERROR DIALOG
		//
		case Actions.SHOW_ERROR_DIALOG:
			return {
				...state,
				errorInfo: action.payload
			}
		//
		// SET_PAYMENT_STATUS_FILTER
		//
		case Actions.SET_PAYMENT_STATUS_FILTER:
			return {
				...state,
				filterParam:
				{
					...state.filterParam,
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
		//
		// SET_CUSTOMER_NAME_NO_GROUPING
		//
		case Actions.SET_CUSTOMER_NAME_NO_GROUPING:
			return {
				...state,
				isCustomerNameNoGrouping: action.payload,
			}
		//
		// SET_PAYMENT_HISTORY_FILTER_PAYMENT_TYPES
		//
		case Actions.SET_PAYMENT_HISTORY_FILTER_PAYMENT_TYPES:
			return {
				...state,
				filterParam: {
					...state.filterParam,
					paymentHistoryTypes: action.payload,
				}
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