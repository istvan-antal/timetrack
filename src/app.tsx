/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-dom.d.ts" />

const React = require('react');
const ReactDom = require('react-dom');

import MainWindow = require('./MainWindow');

React.render(
    <MainWindow/>,
    document.getElementById('app')
);
