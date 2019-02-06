import authRoles from "auth/authRoles";
import AdminImport from "./adminImport";
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const AdminImportConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/admins/imports',
            component: FuseLoadable({
                loader: () => import('./adminImport')
            })
        }
    ]
};

