import {FuseLoadable} from '@fuse';

export const CustomerServiceCallListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/customer-service/call-list',
            component: FuseLoadable({
                loader: () => import('./call-list')
            })
        }
    ]
};
