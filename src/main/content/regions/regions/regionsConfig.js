import {FuseLoadable} from '@fuse';

export const RegionsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/regions/list',
            component: FuseLoadable({
                loader: () => import('./regions')
            })
        }
    ]
};
