import {FuseLoadable} from '@fuse';

export const PlansConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/comissions/plans',
            component: FuseLoadable({
                loader: () => import('./plans')
            })
        }
    ]
};
