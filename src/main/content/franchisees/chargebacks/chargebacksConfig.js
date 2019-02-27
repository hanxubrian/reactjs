import {FuseLoadable} from '@fuse';

export const ChargebacksConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/chargebacks',
            component: FuseLoadable({
                loader: () => import('./chargebacks')
            })
        }
    ]
};
