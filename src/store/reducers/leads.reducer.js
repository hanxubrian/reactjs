import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
	leadsDB: null,
	bLoadedLeads: false,
	bOpenedSummaryPanel: false,
	bOpenedFilterPanel: false,
	bOpenedMapView: false,
	transactionStatus: { checkedPaid: true, checkedPP: true, checkedComplete: true, checkedOpen: true },
	leadForm: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	}
};


const leads = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ALL_LEADS:
			{
				return {
					...initialState,
					leadsDB: action.payload, bLoadedLeads: true
				};
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
		case Actions.DELETE_SELECTED_LEADS:
			{
				return { ...state, leadsDB: action.payload }

			}
		case Actions.REMOVE_SELECTED_LEAD:
			{
				return { ...state, leadDB: action.payload }

			}
		case UserActions.USER_LOGGED_OUT:
			{
				return {
					...initialState
				}
			}
		case Actions.OPEN_NEW_LEAD_FORM:
			{
				return {
					...state,
					bOpenedFilterPanel: true,
					bOpenedSummaryPanel: true,
					leadForm: {
						type: 'new',
						props: {
							open: true
						},
						data: null
					}
				};
			}
		case Actions.CLOSE_NEW_LEAD_FORM:
			{
				return {
					...state,
					leadForm: {
						type: 'new',
						props: {
							open: false
						},
						data: null
					}
				};
			}
		case Actions.OPEN_EDIT_LEAD_FORM:
			{
				return {
					...state,
					leadForm: {
						type: 'create',
						props: {
							open: true
						},
						data: action.data
					}
				};
			}
		case Actions.CLOSE_EDIT_LEAD_FORM:
			{
				return {
					...state,
					leadForm: {
						type: 'create',
						props: {
							open: false
						},
						data: null
					}
				};
			}
		default:
			{
				return state;
			}
	}
};

const persistConfig = {
	key: 'leads',
	storage: storage,
};
export default persistReducer(persistConfig, leads);
