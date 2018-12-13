import {FuseLoadable} from '@fuse';

export const BillRunConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/bill-run',
            component: FuseLoadable({
                loader: () => import('./BillRun')
            })
        }
    ]
};
