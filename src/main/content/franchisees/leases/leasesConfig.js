import {FuseLoadable} from '@fuse';

export const LeasesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/leases',
            component: FuseLoadable({
                loader: () => import('./Leases')
            })
        }
    ]
};
