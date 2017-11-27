/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './App';

const store = configureStore();

render(
    <Provider store={store}>
        <App {...store.getState()}/>
    </Provider>,
    document.getElementById('app')
);