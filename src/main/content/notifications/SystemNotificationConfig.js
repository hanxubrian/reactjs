import authRoles from "auth/authRoles";
import SystemNotification from './SystemNotification';
import SystemNotificationViewContentById from './SystemNotificationViewContentById';
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const SystemNotificationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/notification/system/:id',
            component: FuseLoadable({
                loader: () => import('./SystemNotificationViewContentById')
            })
        },
        {
            path     : '/notification/system',
            component: FuseLoadable({
                loader: () => import('./SystemNotification')
            })
        }
    ]
};

