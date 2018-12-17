import {FuseLoadable} from '@fuse';

export const SalesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/sales/dashboard',
            component: FuseLoadable({
                loader: () => import('./sales')
            })
        }
    ]
};
