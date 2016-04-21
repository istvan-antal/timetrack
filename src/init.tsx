/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-dom.d.ts" />
/// <reference path="../typings/react-redux/react-redux.d.ts" />

import React = require('react');
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
const store = configureStore();

import App = require('./App');

render(
    <Provider store={store}>
        <App {...store.getState()}/>
    </Provider>,
    document.getElementById('app')
);