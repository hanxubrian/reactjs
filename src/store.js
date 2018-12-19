import * as reduxModule from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {applyMiddleware, compose, createStore} from 'redux';
import createReducer from 'store/reducers';
import storage from 'redux-persist/lib/storage';
import middleware from './store/middleware';
/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);

const persistConfig = {
    key: 'janiking_web',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, createReducer());

export const store =  createStore(pReducer, enhancer);
export const persistor = persistStore(store);
store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
    if ( store.asyncReducers[key] )
    {
        return;
    }
    store.asyncReducers[key] = reducer;
    // store.replaceReducer(createReducer(store.asyncReducers));
    store.replaceReducer(persistReducer({key: key,storage: storage,}, store.asyncReducers));
    return store;
};
