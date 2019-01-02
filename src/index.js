import 'babel-polyfill'
import 'typeface-muli';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import './react-table-defaults';
import './styles/index.css';
import './fake-db/fake-db'
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {routes} from './fuse-configs/fuseRoutesConfig';
import {FuseLayout, FuseTheme, FuseAuthorization} from '@fuse';
import MainToolbar from './main/MainToolbar';
import MainNavbarContent from './main/MainNavbarContent';
import MainNavbarHeader from './main/MainNavbarHeader';
import MainFooter from './main/MainFooter';
import jssExtend from 'jss-extend'
import QuickPanel from 'main/quickPanel/QuickPanel';
import ChatPanel from 'main/chatPanel/ChatPanel';
import { PersistGate } from 'redux-persist/lib/integration/react'
import {persistor, store} from "./store";

import {Auth} from 'auth';


const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();

ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Auth>
                <Router history={history}>
                    <FuseAuthorization routes={routes}>
                        <FuseTheme>
                            <FuseLayout
                                routes={routes}
                                toolbar={
                                    <MainToolbar/>
                                }
                                navbarHeader={
                                    <MainNavbarHeader />
                                }
                                navbarContent={
                                    <MainNavbarContent/>
                                }
                                footer={
                                    <MainFooter/>
                                }
                                rightSidePanel={
                                    <React.Fragment>
                                        <ChatPanel/>
                                        <QuickPanel/>
                                    </React.Fragment>
                                }
                                // contentWrapper={
                                //     <SettingsPanel/>
                                // }
                            >
                            </FuseLayout>
                        </FuseTheme>
                    </FuseAuthorization>
                </Router>
            </Auth>
            </PersistGate>
        </Provider>
    </JssProvider>

    , document.getElementById('root'));

registerServiceWorker();

