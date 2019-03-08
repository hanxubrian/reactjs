import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const AcademyAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/franchisee/end-of-month/:courseId/:courseHandle?',
            component: FuseLoadable({
                loader: () => import('./course/Course')
            })
        },
        {
            path     : '/franchisee/end-of-month',
            component: FuseLoadable({
                loader: () => import('./courses/Courses')
            })
        },


        {
            path     : '/franchisee/apps/end-of-month/apps',
            component: () => <Redirect to="/franchisees/end-of-month"/>
        }
    ]
};
