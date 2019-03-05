import {FuseLoadable} from '@fuse';

export const ProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/profile/:id',
            component: FuseLoadable({
                loader: () => import('./ProfilePage')
            })
        },
        {
            path     : '/profile/',
            component: FuseLoadable({
                loader: () => import('./ProfilePage')
            })
        },

    ]
};
