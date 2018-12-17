import {FuseLoadable} from '@fuse';

export const CasesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/customer-service/cases',
            component: FuseLoadable({
                loader: () => import('./cases')
            })
        }
    ]
};
