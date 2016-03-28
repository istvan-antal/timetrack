import React = require('react');
import TimerForm = require('./TimerForm');
import TimerProgress = require('./TimerProgress');
import { TimerModel } from './TimerModel';

interface ComponentProps {

};

interface ComponentState {
    isRunning: boolean;
};

export = class MainWindow extends React.Component<ComponentProps, ComponentState> {
    constructor() {
        super();
        this.state = { isRunning: false };
    }
    onStart(selectedActivity: string) {
        this.setState({
            isRunning: true
        });
    }
    onStop() {
        this.setState({
            isRunning: false
        });
    }
    render() {
        if (this.state.isRunning) {
            return <TimerProgress timer={new TimerModel()} onStop={this.onStop.bind(this)}/>
        }

        return (
            <TimerForm onStart={this.onStart.bind(this)}/>
        );
    }
};
