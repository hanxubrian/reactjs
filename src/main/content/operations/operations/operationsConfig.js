import {FuseLoadable} from '@fuse';

export const OperationsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/operations/dashboard',
            component: FuseLoadable({
                loader: () => import('./operations')
            })
        }
    ]
};
