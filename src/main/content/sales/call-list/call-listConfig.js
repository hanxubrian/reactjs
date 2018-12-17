import {FuseLoadable} from '@fuse';

export const CallListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/sales/call-list',
            component: FuseLoadable({
                loader: () => import('./call-list')
            })
        }
    ]
};
