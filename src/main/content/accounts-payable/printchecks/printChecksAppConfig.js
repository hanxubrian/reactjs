import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const PrintChecksConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/accounts-payable/print-checks',
            component: FuseLoadable({
                loader: () => import('./printChecksApp')
            })
        },
        {
            path     : '/accounts-payable/preview-checks',
            component: FuseLoadable({
                loader: () => import('./PDFExportChecks')
            })
        }
    ]
};

