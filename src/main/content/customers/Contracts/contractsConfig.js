import {FuseLoadable} from '@fuse';

export const ContractsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/customers/contracts',
            component: FuseLoadable({
                loader: () => import('./contracts')
            })
        }
    ]
};
