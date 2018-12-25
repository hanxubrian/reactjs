import {FuseLoadable} from '@fuse';

export const CasesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/bill-run/invoice',
            component: FuseLoadable({
                loader: () => import('./cases')
            })
        }
    ]
};
