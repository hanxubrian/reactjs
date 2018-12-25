import {FuseLoadable} from '@fuse';

export const BillRunConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-receivable/bill-run',
            component: FuseLoadable({
                loader: () => import('./bill-run')
            })
        }
    ]
};
