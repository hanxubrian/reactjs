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
        }
    ]
};

