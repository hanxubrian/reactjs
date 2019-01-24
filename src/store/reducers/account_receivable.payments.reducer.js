import * as Actions from "../actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
	ACC_payments: [],
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
};


const accountReceivablePayments = function (state = initialState, action) {

	switch (action.type) {
		case Actions.GET_ALL_RECEIVABLE_PAYMENTS: {
			return {
				...state,
				ACC_payments: action.payload.Data,
				bACC_fechStart: false
			}
		}
		case Actions.GET_ALL_RECEIVABLE_PAYMENTS_START: {
			return {
				...state,
				bACC_fechStart: true
			}
		}
		case Actions.ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_FILTER_PANEL:
			{
				return {
					...state, bOpenedFilterPanel: !state.bOpenedFilterPanel
				}
			}
		case Actions.ACCOUNT_RECEIVABLE_PAYMENTS_TOGGLE_SUMMARY_PANEL:
			{
				return {
					...state, bOpenedSummaryPanel: !state.bOpenedSummaryPanel
				}
			}
		case Actions.APPLY_SEARCH_TEXT_ARP: {
			return {
				...state, searchText: action.payload
			}
		}
		case Actions.OPEN_PAYMENT_DIALOG:
			{
				return {
					...state, bOpenPaymentDialog: action.payload
				}
			}
		case Actions.SET_ACTIVE_PAYMENT_ROWS:
			{
				return {
					...state, activePaymentRows: action.payload
				}
			}
		default:
			{
				return state;
			}
	}
};

const persistConfig = {
	key: 'account_receivable_payments',
	storage: storage,
	blacklist: ['ACC_payments']
};
export default persistReducer(persistConfig, accountReceivablePayments);