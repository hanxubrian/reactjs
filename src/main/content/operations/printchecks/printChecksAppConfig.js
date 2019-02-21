import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const PrintChecksConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-receivable/printChecks',
            component: FuseLoadable({
                loader: () => import('./printChecksApp')
            })
        }
    ]
};

