import {FuseLoadable} from '@fuse';

export const CallListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/sales/accounts-receivable',
            component: FuseLoadable({
                loader: () => import('./call-list')
            })
        }
    ]
};
