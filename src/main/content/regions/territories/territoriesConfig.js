import {FuseLoadable} from '@fuse';

export const TerritoriesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/regions/territories',
            component: FuseLoadable({
                loader: () => import('./territories')
            })
        }
    ]
};
