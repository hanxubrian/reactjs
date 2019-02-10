import * as Actions from '../actions';
import * as UserActions from "../../../../auth/store/actions";
import {GET_USER_FORM_PERMISSION_LIST} from "../actions";
import {GET_USER_FORM_DEPARTMENT_LIST} from "../actions";
import {GET_USER_FORM_STATE_LIST} from "../actions";
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
    userDetail: null,
    payload:{
        PasswordHash: "sample string 1",
        IsFirstTimeLogin: "sample string 2",
        Salt: "sample string 3",
        OutlookPassword: "sample string 4",
        Apps: [
          {
            _id: "sample string 1",
            MenuOptions: [
              {
                Children: [
                  {
                    AppId: 1.1,
                    Icon: "sample string 2",
                    IconMobile: "sample string 3",
                    IframeUrl: "sample string 4",
                    MenuId: 5.1,
                    MenuLevel: 6.1,
                    MenuOrder: 7.1,
                    ParentId: 8.1,
                    Slug: "sample string 9",
                    TabName: "sample string 10",
                    Title: "sample string 11",
                    Type: "sample string 12"
                  },
                  {
                    AppId: 1.1,
                    Icon: "sample string 2",
                    IconMobile: "sample string 3",
                    IframeUrl: "sample string 4",
                    MenuId: 5.1,
                    MenuLevel: 6.1,
                    MenuOrder: 7.1,
                    ParentId: 8.1,
                    Slug: "sample string 9",
                    TabName: "sample string 10",
                    Title: "sample string 11",
                    Type: "sample string 12"
                  }
                ],
                Icon: "sample string 1",
                IconMobile: "sample string 2",
                IframeUrl: "sample string 3",
                MenuId: 4.1,
                Level: 5.1,
                Slug: "sample string 6",
                TabName: "sample string 7",
                Title: "sample string 8",
                Type: "sample string 9"
              },
              {
                Children: [
                  {
                    AppId: 1.1,
                    Icon: "sample string 2",
                    IconMobile: "sample string 3",
                    IframeUrl: "sample string 4",
                    MenuId: 5.1,
                    MenuLevel: 6.1,
                    MenuOrder: 7.1,
                    ParentId: 8.1,
                    Slug: "sample string 9",
                    TabName: "sample string 10",
                    Title: "sample string 11",
                    Type: "sample string 12"
                  },
                  {
                    AppId: 1.1,
                    Icon: "sample string 2",
                    IconMobile: "sample string 3",
                    IframeUrl: "sample string 4",
                    MenuId: 5.1,
                    MenuLevel: 6.1,
                    MenuOrder: 7.1,
                    ParentId: 8.1,
                    Slug: "sample string 9",
                    TabName: "sample string 10",
                    Title: "sample string 11",
                    Type: "sample string 12"
                  }
                ],
                Icon: "sample string 1",
                IconMobile: "sample string 2",
                IframeUrl: "sample string 3",
                MenuId: 4.1,
                Level: 5.1,
                Slug: "sample string 6",
                TabName: "sample string 7",
                Title: "sample string 8",
                Type: "sample string 9"
              }
            ]
          },
          {
            _id: "sample string 1",
            MenuOptions: [
              {
                Children: [
                  {
                    AppId: 1.1,
                    Icon: "sample string 2",
                    IconMobile: "sample string 3",
                    IframeUrl: "sample string 4",
                    MenuId: 5.1,
                    MenuLevel: 6.1,
                    MenuOrder: 7.1,
                    ParentId: 8.1,
                    Slug: "sample string 9",
                    TabName: "sample string 10",
                    Title: "sample string 11",
                    Type: "sample string 12"
                  },
                  {
                    AppId: 1.1,
                    Icon: "sample string 2",
                    IconMobile: "sample string 3",
                    IframeUrl: "sample string 4",
                    MenuId: 5.1,
                    MenuLevel: 6.1,
                    MenuOrder: 7.1,
                    ParentId: 8.1,
                    Slug: "sample string 9",
                    TabName: "sample string 10",
                    Title: "sample string 11",
                    Type: "sample string 12"
                  }
                ],
                Icon: "sample string 1",
                IconMobile: "sample string 2",
                IframeUrl: "sample string 3",
                MenuId: 4.1,
                Level: 5.1,
                Slug: "sample string 6",
                TabName: "sample string 7",
                Title: "sample string 8",
                Type: "sample string 9"
              },
              {
                Children: [
                  {
                    AppId: 1.1,
                    Icon: "sample string 2",
                    IconMobile: "sample string 3",
                    IframeUrl: "sample string 4",
                    MenuId: 5.1,
                    MenuLevel: 6.1,
                    MenuOrder: 7.1,
                    ParentId: 8.1,
                    Slug: "sample string 9",
                    TabName: "sample string 10",
                    Title: "sample string 11",
                    Type: "sample string 12"
                  },
                  {
                    AppId: 1.1,
                    Icon: "sample string 2",
                    IconMobile: "sample string 3",
                    IframeUrl: "sample string 4",
                    MenuId: 5.1,
                    MenuLevel: 6.1,
                    MenuOrder: 7.1,
                    ParentId: 8.1,
                    Slug: "sample string 9",
                    TabName: "sample string 10",
                    Title: "sample string 11",
                    Type: "sample string 12"
                  }
                ],
                Icon: "sample string 1",
                IconMobile: "sample string 2",
                IframeUrl: "sample string 3",
                MenuId: 4.1,
                Level: 5.1,
                Slug: "sample string 6",
                TabName: "sample string 7",
                Title: "sample string 8",
                Type: "sample string 9"
              }
            ]
          }
        ],
        UserId: 6,
        UserName: "sample string 7",
        FirstName: "sample string 8",
        LastName: "sample string 9",
        Email: "sample string 10",
        Phone: "sample string 11",
        Address: "sample string 12",
        City: "sample string 13",
        State: "sample string 14",
        Zipcode: "sample string 15",
        DepartmentId: "sample string 16",
        Title: "sample string 17",
        OutlookUsername: "sample string 18",
        DefaultRegionId: 19,
        ProfilePhoto: "sample string 20",
        UserType: "sample string 21",
        Roles: [1,2],
        Groups: [1,2],
        Regions: [1,2]
      }
}

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
        case Actions.UPDATE_USER_SELECT_ROWS:{
            return{
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