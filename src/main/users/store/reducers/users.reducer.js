import * as Actions from '../actions';
import * as UserActions from "../../../../auth/store/actions";
const initialState = {
    openUsersFormStatus: false,
    selectedRows: [],
    fpStatus: false,
    payload:{
        picture:null,
        fName: "",
        lName: "",
        title: "",
        phone: "",
        email: "",
        department:"",
        address: "",
        city: "",
        state: "",
        Zip: "",
        uName: "",
        uPassword: "",
        uGroup: [],
        uRegion: [],
        defaultRegion: "",
        uRole: [],
        uType: "",
        uPermission:[
            {
                appId: 0,
                appType: "web",
                pPermission:[
                    {
                        menuId: 1,
                        Children: [
                            {
                                menuId: 2,
                                view: true,
                                edit: true,
                                delete: true,
                                execute: true
                            },
                            {
                                menuId: 2,
                                view: true,
                                edit: true,
                                delete: true,
                                execute: true
                            }
                        ]
                    }
                ]
            },
            {
                appId: 1,
                appType: "phone",
                pPermission:[
                    {
                        menuId: 1,
                        Children: [
                            {
                                menuId: 2,
                                view: true,
                                edit: true,
                                delete: true,
                                execute: true
                            },
                            {
                                menuId: 4,
                                view: true,
                                edit: true,
                                delete: true,
                                execute: true
                            }
                        ]
                    }
                ]
            },
            {
                appId: 2,
                appType: "tablet",
                pPermission:[
                    {
                        menuId: 1,
                        Children: [
                            {
                                menuId: 2,
                                view: true,
                                edit: true,
                                delete: true,
                                execute: true
                            },
                            {
                                menuId: 2,
                                view: true,
                                edit: true,
                                delete: true,
                                execute: true
                            }
                        ]
                    }
                ]
            }
        ]


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