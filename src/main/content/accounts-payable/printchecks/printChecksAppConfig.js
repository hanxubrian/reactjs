import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const PrintChecksConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-payable/printChecks',
            component: FuseLoadable({
                loader: () => import('./printChecksApp')
            })
        }
    ]
};

