import authRoles from "auth/authRoles";
import Admin from './admin';
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const AdminConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/admin',
            component: FuseLoadable({
                loader: () => import('./admin')
            })
        }
    ]
};

