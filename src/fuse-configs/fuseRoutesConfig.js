import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {appsConfigs} from 'main/content/apps/appsConfigs';
import {pagesConfigs} from "../main/content/pagesConfigs";
import {ExampleConfig} from 'main/content/example/ExampleConfig';

const routeConfigs = [
    ...appsConfigs,
    ...pagesConfigs,
    ExampleConfig,
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/profile"/>
        // component: () => <Redirect to="/auth/signin"/>
    }
];
