import React = require('react');
import { Activity } from '../entities';
import { formatElapsedSeconds } from '../formatElapsedSeconds';

interface ComponentProps {
    startTime: number
    activity: Activity
    showActivityList: () => any
    stopTimer: () => any
}

export class TimerDisplay extends React.Component<ComponentProps, { timeDisplay: string }> {
    private ticker: NodeJS.Timer
    constructor(props, context) {
        super(props, context);
        //TODO: calculate this to prevent "flicker"
        this.state = {
            timeDisplay: '00:00:00'
        }
    }
    componentWillMount() {
        this.ticker = setInterval(() => {
            const currentTime = Math.floor((new Date()).getTime() / 1000);
            const timeDiff = currentTime - this.props.startTime;
            this.setState({
                timeDisplay: formatElapsedSeconds(timeDiff)
            });
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.ticker);
    }
    render() {
        return <div className="window">
            <div className="window-content">
                <div className="padded-more">
                    {this.state.timeDisplay} - {this.props.activity.name}
                </div>
            </div>
            <footer className="toolbar toolbar-footer">
                <div className="toolbar-actions">
                    <button onClick={this.props.stopTimer} className="btn btn-primary pull-left">
                        Stop
                    </button>
                    <button onClick={this.props.showActivityList} className="btn btn-default pull-right">
                        <span className="icon icon-list"></span>
                    </button>
                </div>
            </footer>
        </div>
    }
};
