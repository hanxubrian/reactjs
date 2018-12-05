import Signin from './SigninPage';
import {authRoles} from 'auth';

export const SigninPageConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    // auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/auth/signin',
            component: Signin
        }
    ]
};

