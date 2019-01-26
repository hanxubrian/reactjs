import authRoles from "auth/authRoles";
import PaymentLockBoxReport from "./PaymentLockBoxReport";
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const PaymentLockBoxReportConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/payments/lockbox/log',
            component: FuseLoadable({
                loader: () => import('./PaymentLockBoxReport')
            })
        }
    ]
};

