import {FuseLoadable} from '@fuse';

export const InspectionsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/operations/inspections',
            component: FuseLoadable({
                loader: () => import('./inspections')
            })
        }
    ]
};
