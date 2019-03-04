import moment from "moment"

import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const initialState = {
    agingReports: null,
    bFetchingAging: false,
    errorMsg: '',
    agingParams: {
        CustomerNoList: [],
        AgingDate: '01/01/2018',
        PaymentDate: moment().format('MM/DD/YYYY'),
        IncludeMonth: 12,
        CalculateMethod: "Bill Month",
        OrderBy: "",
        BalanceRestriction: 0,
        ChargeBackOn: true,
    },
    bAgingFilterPanel: false,
};

const agings = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_STARTED_AGINGS_FETCH:
            return {...state, bFetchingAging: true};
        case Actions.GET_AGING_REPORTS_SUCCESS:
            return {...state, agingReports: action.payload, bFetchingAging: false};
        case Actions.GET_AGING_REPORTS_ERROR:
            return {...state, agingReports: null, bFetchingAging: false, errorMsg: action.payload};
        case Actions.TOGGLE_AGING_FILTER_PANEL:
            return {...state, bAgingFilterPanel: !state.bAgingFilterPanel};
        case Actions.UPDATE_AGING_FILTER_PARAMETERS:
            return {...state, agingParams: action.payload};
        case UserActions.USER_LOGGED_OUT:
            return {...initialState};
        default:
            return state;
    }
};


const persistConfig = {
    key: 'agings',
    storage: storage,
    blacklist: []
};

export default persistReducer(persistConfig, agings);
