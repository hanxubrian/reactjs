import {FuseLoadable} from '@fuse';

export const CustomerServicesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/customer-service/customers',
            component: FuseLoadable({
                loader: () => import('./customer-services')
            })
        }
    ]
};
