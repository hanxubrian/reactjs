import {FuseLoadable} from '@fuse';

export const LeadsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/sales/leads',
            component: FuseLoadable({
                loader: () => import('./Leads')
            })
        }
    ]
};
