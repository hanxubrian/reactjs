import authRoles from "auth/authRoles";
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const PaymentListConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/payment-list',
            component: FuseLoadable({
                loader: () => import('./payment-list')
            })
        },
        {
            path     : '/checkbook-list',
            component: FuseLoadable({
                loader: () => import('./checkbookApp')
            })
        },
        {
            path     : '/payment-log-list',
            component: FuseLoadable({
                loader: () => import('./paymentLogApp')
            })
        }
    ]
};

