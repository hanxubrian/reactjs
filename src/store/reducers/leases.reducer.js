import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
	leasesDB: null,
	bLoadedLeases: false,
	bOpenedSummaryPanel: false,
	bOpenedFilterPanel: false,
	bOpenedMapView: false,
	transactionStatus: { checkedPaid: true, checkedPP: true, checkedComplete: true, checkedOpen: true },
	leaseForm: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	}
};


const leases = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ALL_LEASES:
			{
				return {
					...initialState,
					leasesDB: action.payload, bLoadedLeases: true
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
		case Actions.DELETE_SELECTED_LEASES:
			{
				return { ...state, leasesDB: action.payload }

			}
		case Actions.REMOVE_SELECTED_LEASE:
			{
				return { ...state, leasesDB: action.payload }

			}
		case UserActions.USER_LOGGED_OUT:
			{
				return {
					...initialState
				}
			}
		case Actions.OPEN_NEW_LEASE_FORM:
			{
				return {
					...state,
					bOpenedFilterPanel: true,
					bOpenedSummaryPanel: true,
					leaseForm: {
						type: 'new',
						props: {
							open: true
						},
						data: null
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
						data: null
					}
				};
			}
		case Actions.OPEN_EDIT_LEASE_FORM:
			{
				return {
					...state,
					leaseForm: {
						type: 'create',
						props: {
							open: true
						},
						data: action.data
					}
				};
			}
		case Actions.CLOSE_EDIT_LEASE_FORM:
			{
				return {
					...state,
					leaseForm: {
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
	key: 'leases',
	storage: storage,
};
export default persistReducer(persistConfig, leases);
