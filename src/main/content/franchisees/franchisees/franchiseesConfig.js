import {FuseLoadable} from '@fuse';

export const FranchiseesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/list',
            component: FuseLoadable({
                loader: () => import('./franchisees')
            })
        }
    ]
};
