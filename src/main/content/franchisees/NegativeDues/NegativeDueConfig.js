import authRoles from "auth/authRoles";
import NegativeDueApp from './NegativeDueApp';
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const NegativeDueConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/negativedues',
            component: FuseLoadable({
                loader: () => import('./NegativeDueApp')
            })
        }
    ]
};