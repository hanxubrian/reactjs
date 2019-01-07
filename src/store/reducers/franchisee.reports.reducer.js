import * as Actions from "../actions/";
import * as UserActions from "../../auth/store/actions/";

const initialState = {
    franchiseeReports: null,
    franchiseeReport: null,
    bLoadedFranchiseeReports: false,
    bOpenedFilterPanelFranchiseeReports: false,
    FranchiseesReportForm: {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};


const franchiseeReports = function(state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FRANCHISEE_REPORTS:
        {
            return {
                ...state,
                franchiseeReports: action.payload,
                bLoadedFranchiseeReports: true,
            };
        }
        case Actions.GET_FRANCHISEE_REPORT_DETAIL:
        {
            return {
                ...state,
                franchiseeReport: action.payload,
            }
        }
        case Actions.TOGGLE_FRANCHISEES_REPORTS_FILTER_PANEL:
        {
            return {
                ...state, bOpenedFilterPanelFranchiseeReports: !state.bOpenedFilterPanelFranchiseeReports
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        case Actions.OPEN_EDIT_FRANCHISEES_FORM:
        {
            return {
                ...state,
                createFranchisees: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_FRANCHISEES_FORM:
        {
            return {
                ...state,
                createFranchisees: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default franchiseeReports;
