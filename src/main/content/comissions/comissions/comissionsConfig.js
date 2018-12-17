import {FuseLoadable} from '@fuse';

export const ComissionsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/comissions/dashboard',
            component: FuseLoadable({
                loader: () => import('./comissions')
            })
        }
    ]
};
