import {FuseLoadable} from '@fuse';

export const HomepageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/home1',
            component: FuseLoadable({
                loader: () => import('./Homepage')
            })
        }
    ]
};
