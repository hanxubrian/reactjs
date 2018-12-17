import {FuseLoadable} from '@fuse';

export const EndofmonthConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/franchisees/end-of-month',
            component: FuseLoadable({
                loader: () => import('./endofmonth')
            })
        }
    ]
};
