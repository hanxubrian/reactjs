import {FuseLoadable} from '@fuse';

export const HomepageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/home',
            component: FuseLoadable({
                loader: () => import('./Homepage')
            })
        }
    ]
};
