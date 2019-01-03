import {FuseLoadable} from '@fuse';

export const ReportsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/reports',
            component: FuseLoadable({
                loader: () => import('./reports')
            })
        }
    ]
};
