/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-dom.d.ts" />

import React = require('react');
import { render } from 'react-dom';

import MainWindow = require('./MainWindow');

render(
    <MainWindow/>,
    document.getElementById('app')
);
