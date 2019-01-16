import {FuseLoadable} from '@fuse';

export const DashboardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/dashboards/analytics',
            component: FuseLoadable({
                loader: () => import('./Dashboard')
            })
        }
    ]
};
