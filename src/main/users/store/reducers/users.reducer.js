import _ from 'lodash';
import * as Actions from '../actions';
import * as UserActions from "../../../../auth/store/actions";
const initialState = {
    openUsersFormStatus: false,
    bNewForm: true,//true for new, false for edit
    selectedRows: [],
    fpStatus: false,
    userGroupList: [],
    userRoleList: [],
    userTypeList: [],
    userStateList: [],
    userDepartmentList: [],
    userPermissionList: [],
    userDetail: null,
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
            let userDetail = state.userDetail;
            if(!action.payload.openForm){
                userDetail = null;
            } 
            if(userDetail === null){
                return {
                ...state,
                openUsersFormStatus: action.payload.openForm, bNewForm: action.payload.bNewForm,
                fpStatus: false, userDetail: userDetail
            }
            }else{
                return {
                ...state,
                openUsersFormStatus: action.payload.openForm, bNewForm: action.payload.bNewForm,
                fpStatus: false, userDetail: userDetail,payload: userDetail.details
            }
        }                
                  
        }
        case Actions.GET_USERS_LIST: {
          return {
              ...state,
              usersList: action.payload
          }
        }
        case Actions.UPDATE_USER: {
            return {
                ...state,
                openUsersFormStatus: false
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
            const data = _.cloneDeep(action.payload);
            return{
                ...state,
                userDetail: {...state.userDetail, details: data}
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
        case Actions.GET_USER_MENU_OPTIONS:
        {
            return {
                ...state, userDetail: {...state.userDetail, menuOptions: action.payload}
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
