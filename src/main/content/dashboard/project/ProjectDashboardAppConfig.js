import {FuseLoadable} from '@fuse';

export const ProjectDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/home',
            component: FuseLoadable({
                loader: () => import('./ProjectDashboardApp')
            })
        }
    ]
};
