import {FuseLoadable} from '@fuse';

export const TransactionsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/transactions',
            component: FuseLoadable({
                loader: () => import('./transactions')
            })
        }
    ]
};
