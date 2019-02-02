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
                // loader: () => import('./report')
                loader: () => import('./reportlayout')
            })
        },
        {
            path     : '/franchisees/report/legacy',
            component: FuseLoadable({
                // loader: () => import('./report')
                loader: () => import('./reportCuslayout')
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
