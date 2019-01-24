import {FuseLoadable} from '@fuse';

export const VerificationsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/activity/verifications',
            component: FuseLoadable({
                loader: () => import('./VerificationsApp')
            })
        }
    ]
};
