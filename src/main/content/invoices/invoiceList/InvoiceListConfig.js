import {FuseLoadable} from '@fuse';

export const InvoiceListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/invoice-list',
            component: FuseLoadable({
                loader: () => import('./InvoiceList')
            })
        }
    ]
};
