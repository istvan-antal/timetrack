/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-dom.d.ts" />

import React = require('react');
import ReactDom = require('react-dom');

import MainWindow = require('./MainWindow');

ReactDom.render(
    <MainWindow/>,
    document.getElementById('app')
);
