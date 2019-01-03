import {FuseLoadable} from '@fuse';

export const InvoiceConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-receivable/invoices',
            component: FuseLoadable({
                loader: () => import('./invoiceApp')
            })
        }
    ]
};
