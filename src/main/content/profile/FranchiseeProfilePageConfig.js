import {FuseLoadable} from '@fuse';

export const FranchiseeProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisee/profile',
            component: FuseLoadable({
                loader: () => import('./FranchiseeProfilePage')
            })
        }
    ]
};
