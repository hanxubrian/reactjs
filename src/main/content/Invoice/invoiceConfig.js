import {FuseLoadable} from '@fuse';

export const InvoiceConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/invoices/dashboard',
            component: FuseLoadable({
                loader: () => import('./invoiceList')
            })
        }
    ]
};
