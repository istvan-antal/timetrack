import React = require('react');
import { TimerModel } from './TimerModel';

interface ComponentProps {
    timer: TimerModel,
    onStop: () => void
};

interface ComponentState {
    secondsDiff: number;
};

export = class TimerProgress extends React.Component<ComponentProps, ComponentState> {
    constructor(props) {
        super();
        this.state = {
            secondsDiff: 0
        };
        props.timer.onUpdate((secondsDiff) => {
            this.setState({
                secondsDiff: secondsDiff
            });
        });
    }
    onStop(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onStop();
    }
    render() {
        return (
            <form>
                <span>{this.state.secondsDiff} seconds</span>
                <button onClick={this.onStop.bind(this)}>Stop</button>
            </form>
        );
    }
    componentWillUnmount() {
        this.props.timer.destroy();
    }
};
