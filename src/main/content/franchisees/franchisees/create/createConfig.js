import {FuseLoadable} from '@fuse';

export const FranchiseesCreateConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/create',
            component: FuseLoadable({
                loader: () => import('./create')
            })
        }
    ]
};