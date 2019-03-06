import * as Actions from "../actions/account_receivable.payments.actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import moment from "moment"

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
		fromDate: moment().subtract(6, 'months').format("MM/DD/YYYY"),
		toDate: moment().format("MM/DD/YYYY"),
	},
	viewMode: "Invoice",
	isCustomerNameNoGrouping: true,


	paymentDlgPayloads: {
		open: false,
		paymentType: "Check",
		paymentAmount: 0
	},
	paymentTypes: [],

	startPaymentHistory: false,
	bLoadedPaymentHistory: false,
	paymentHistory: [],
	loading: {},

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
				loading: {
					...state.loading,
					bACC_fechStart: "",
				},
			}
		case Actions.GET_ALL_RECEIVABLE_PAYMENTS_START:
			return {
				...state,
				bACC_fechStart: true,
				loading: {
					...state.loading,
					bACC_fechStart: "Fetching all payments data...",
				},
			}
		case Actions.FAILED_GET_ALL_RECEIVABLE_PAYMENTS:
			return {
				...state,
				NoDataString: action.payload,
				bACC_fechStart: false,
				loading: {
					...state.loading,
					bACC_fechStart: "",
				},
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
				loading: {
					...state.loading,
					startPaymentHistory: "",
				},
			}
		case Actions.GET_PAYMENT_HISTORY_START:
			return {
				...state,
				startPaymentHistory: true,
				loading: {
					...state.loading,
					startPaymentHistory: "Fetching all payments history data...",
				},
			}
		case Actions.GET_PAYMENT_HISTORY_FAILED:
			return {
				...state,
				NoDataString: action.payload,
				startPaymentHistory: false,
				loading: {
					...state.loading,
					startPaymentHistory: "",
				},
			}
		//
		// PAYMENT CREATE
		// 
		case Actions.CREATE_AR_PAYMENTS:
			return {
				...state,
				paymentsCreated: action.payload,
				isStartedPaymentsCreated: false,
				loading: {
					...state.loading,
					isStartedPaymentsCreated: "",
				},
			}
		case Actions.CREATE_AR_PAYMENTS_START:
			return {
				...state,
				isStartedPaymentsCreated: true,
				loading: {
					...state.loading,
					isStartedPaymentsCreated: "Creating payment...",
				},
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
		//
		// filter start date
		//
		case Actions.FILTER_PAYMENT_START_DATE:
			return {
				...state,
				filterParam: {
					...state.filterParam,
					fromDate: action.payload,
				}
			}
		//
		// filter start date
		//
		case Actions.FILTER_PAYMENT_END_DATE:
			return {
				...state,
				filterParam: {
					...state.filterParam,
					toDate: action.payload,
				}
			}

		//
		// INITIATE STATES WHEN LOGOUT
		//
		case UserActions.USER_LOGGED_OUT:
			return {
				...initialState
			}
		case Actions.GET_PAYMENT_TYPES:
			return {
				...state,
				paymentTypes: action.payload
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