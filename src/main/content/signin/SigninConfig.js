import Signin from './Signin';

export const SigninConfig = {
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

