import {FuseLoadable} from '@fuse';

export const AccountsReceivableConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-receivable',
            component: FuseLoadable({
                loader: () => import('./accounts-receivable')
            })
        }
    ]
};
