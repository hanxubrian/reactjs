import {FuseLoadable} from '@fuse';

export const DistributionsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/distributions',
            component: FuseLoadable({
                loader: () => import('./distributions')
            })
        }
    ]
};
