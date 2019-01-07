import {FuseLoadable} from '@fuse';

export const ReportsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/reports/:regionid/:year/:month/:franchiseenumber',
            component: FuseLoadable({
                loader: () => import('./report')
            })
        },
        {
            path     : '/franchisees/reports',
            component: FuseLoadable({
                loader: () => import('./reportsApp')
            })
        }
    ]
};
