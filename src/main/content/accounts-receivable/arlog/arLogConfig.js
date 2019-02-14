import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const ArLogConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-receivable/arlog',
            component: FuseLoadable({
                loader: () => import('./arLogApp')
            })
        }
    ]
};

