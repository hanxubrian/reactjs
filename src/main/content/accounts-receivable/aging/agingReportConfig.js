import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const AgingReportConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-receivable/aging',
            component: FuseLoadable({
                loader: () => import('./agingReportApp')
            })
        }
    ]
};

