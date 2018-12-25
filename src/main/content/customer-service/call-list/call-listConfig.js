import {FuseLoadable} from '@fuse';

export const CustomerServiceCallListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/bill-run/accounts-receivable',
            component: FuseLoadable({
                loader: () => import('./call-list')
            })
        }
    ]
};
