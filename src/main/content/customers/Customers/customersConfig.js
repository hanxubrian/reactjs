import {FuseLoadable} from '@fuse';

export const CustomersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/customers/list',
            component: FuseLoadable({
                loader: () => import('./customers')
            })
        }
    ]
};
