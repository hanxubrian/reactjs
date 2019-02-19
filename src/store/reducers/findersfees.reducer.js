import * as Actions from "../actions";
import * as UserActions from "../../auth/store/actions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
	findersFeesDB: null,
	bLoadedFindersFees: false,
	bOpenedSummaryPanel: false,
    bOpenedFilterPanel: false,
    bOpenedFilterPanelFindersFees: false,
    year: 2018,
    month: 12,
    bFindersFeesFetchStart: false,
	bOpenedMapView: false,
	transactionStatus: { checkedPaid: true, checkedPP: true, checkedComplete: true, checkedOpen: true },
	findersFeesForm: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	}
};


const findersFees = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ALL_FINDERSFEES:
			{
				return {
					...state,
                    findersFeesDB: action.payload,
                    bLoadedFindersFees: true,
                    bOpenedFilterPanelFindersFees: state.bOpenedFilterPanelFindersFees,
                    bFindersFeesFetchStart: false
				};
            }
        case Actions.GET_FINDERSFEES_FETCH_START:
            {
                return {
                    ...state,
                    bFindersFeesFetchStart: true
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
		case Actions.DELETE_SELECTED_FINDERSFEES:
			{
				return { ...state, findersFeesDB: action.payload }

			}
		case Actions.REMOVE_SELECTED_FINDERSFEE:
			{
				return { ...state, findersFeesDB: action.payload }

			}
		case UserActions.USER_LOGGED_OUT:
			{
				return {
					...initialState
				}
			}
		case Actions.OPEN_NEW_FINDERSFEE_FORM:
			{
				return {
					...state,
					bOpenedFilterPanel: true,
					bOpenedSummaryPanel: true,
					findersFeesForm: {
						type: 'new',
						props: {
							open: true
						},
						data: null
					}
				};
			}
		case Actions.CLOSE_NEW_FINDERSFEE_FORM:
			{
				return {
					...state,
					findersFeesForm: {
						type: 'new',
						props: {
							open: false
						},
						data: null
					}
				};
			}
		case Actions.OPEN_EDIT_FINDERSFEE_FORM:
			{
				return {
					...state,
					findersFeesForm: {
						type: 'create',
						props: {
							open: true
						},
						data: action.data
					}
				};
			}
		case Actions.CLOSE_EDIT_FINDERSFEE_FORM:
			{
				return {
					...state,
					findersFeesForm: {
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
	key: 'findersFees',
	blacklist: ['findersFeesDB'],
	storage: storage,
};
export default persistReducer(persistConfig, findersFees);
