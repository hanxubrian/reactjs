import React from 'react';
import {FuseLoadable} from '@fuse';

export const UsersAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/settings/users',
            component: FuseLoadable({
                loader: () => import('./UsersApp')
            })
        }
    ]
};
