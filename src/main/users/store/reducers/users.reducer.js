import * as Actions from '../actions';
import * as UserActions from "../../../../auth/store/actions";
const initialState = {
    openUsersFormStatus: false,
    selectedRows: [],
    fpStatus: false,
    userGroupList: [],
    userRoleList: [],
    userTypeList: [],
    userStateList: [],
    userDepartmentList: [],
    userPermissionList: [],
    userDetail: [],
    usersList: [],
    payload:{
      PasswordHash: "",
      IsFirstTimeLogin: "",
      Salt: "",
      OutlookPassword: "",
      Apps: [],
      Groups: [],
      _id: "",
      UserId: 6,
      UserName: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
      Address1: "",
      Address2: "",
      City: "",
      State: "Alabama",
      Zipcode: "",
      DepartmentId: "Department 1",
      Title: "",
      OutlookUsername: "",
      DefaultRegionId: 2,
      ProfilePhoto: "",
      UserType: "",
      UserTypeValue: "",
      Roles: [],
      Regions: []
    },
    newUserAvatar: null,
};

const usersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.OPEN_USERS_FORM: {
            return {
                ...state,
                openUsersFormStatus: action.payload,
                fpStatus: false,
            }
        }
        case Actions.GET_USERS_LIST: {
          return {
              ...state,
              usersList: action.payload
          }
        }
        case Actions.UPDATE_USER_SELECT_ROWS:{
            return {
                ...state,
                selectedRows: action.payload
            }
        }
        case Actions.TOGGLE_USERS_FILTER_PANEL: {
            return{
                ...state,
                fpStatus: !state.fpStatus
            }
        }
        case Actions.GET_USER_FORM_GROUP_LIST: {
            return{
                ...state,
                userGroupList: action.payload
            }
        }
        case Actions.GET_USER_FORM_ROLE_LIST: {
            return{
                ...state,
                userRoleList: action.payload
            }
        }
        case Actions.GET_USER_FORM_USERTYPE_LIST: {
            return{
                ...state,
                userTypeList: action.payload
            }
        }
        case Actions.GET_USER_FORM_STATE_LIST: {
            return{
                ...state,
                userStateList: action.payload
            }
        }
        case Actions.GET_USER_FORM_DEPARTMENT_LIST: {
            return{
                ...state,
                userDepartmentList: action.payload
            }
        }
        case Actions.GET_USER_FORM_PERMISSION_LIST: {
            return{
                ...state,
                userPermissionList: action.payload
            }
        }
        case Actions.CREATE_USER:
        {
            return{
                ...state,
            }
        }
        case Actions.UPDATE_USER:
        {
            return{
                ...state,
            }
        }
        case Actions.DELETE_USER:
        {
            return{
                ...state,
            }
        }
        case Actions.GET_USER_DETAIL:
        {
            return{
                ...state,
                userDetail: action.payload
            }
        }
        case Actions.GET_USER_FORM_VARIABLE: {
            return{
                ...state,
                payload: action.payload
            }
        }
        case Actions.UPDATE_NEW_USER_AVATAR: {
            return{
                ...state,
                newUserAvatar: action.payload
            }
        }
        case Actions.SET_NEW_USER_AVATAR_URL: {
            return{
                ...state,
                payload:{...state.payload, ProfilePhoto: action.payload}
            }
        }
        case UserActions.USER_LOGGED_OUT:
        {
            return {
                ...initialState
            }
        }
        default:
            return state;
    }
};

export default usersReducer;
