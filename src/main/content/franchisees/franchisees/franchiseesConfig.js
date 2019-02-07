import {FuseLoadable} from '@fuse';

export const FranchiseesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/reports_new/:regionid/:year/:month/:franchiseenumber',
            component: FuseLoadable({
                loader: () => import('./reportDetailLayout')
            })
        },
        {
            path     : '/franchisees/list',
            component: FuseLoadable({
                loader: () => import('./franchisees')
            })
        }
    ]
};
