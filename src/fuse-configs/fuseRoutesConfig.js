import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {SigninConfig} from 'main/content/signin/SigninConfig';
import {ExampleConfig} from 'main/content/example/ExampleConfig';

const routeConfigs = [
    ExampleConfig,
    SigninConfig,
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        // component: () => <Redirect to="/example"/>
        component: () => <Redirect to="/auth/signin"/>
    }
];
