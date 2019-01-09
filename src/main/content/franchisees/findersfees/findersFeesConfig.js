import {FuseLoadable} from '@fuse';

export const FindersFeesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/findersfees',
            component: FuseLoadable({
                loader: () => import('./findersfees')
            })
        }
    ]
};
