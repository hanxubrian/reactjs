import {FuseLoadable} from '@fuse';

export const CustomerServicesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/customer-service/dashboard',
            component: FuseLoadable({
                loader: () => import('./customer-services')
            })
        }
    ]
};
