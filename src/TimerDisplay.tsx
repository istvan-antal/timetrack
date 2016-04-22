import React = require('react');
import { Activity } from './entities';

interface ComponentProps {
    activity: Activity
    showActivityList: () => any
    stopTimer: () => any
}

export class TimerDisplay extends React.Component<ComponentProps, any> {
    render() {
        return <div className="window">
            <div className="window-content">
                <div className="padded-more">
                    00:00:00
                </div>
            </div>
            <footer className="toolbar toolbar-footer">
                <div className="toolbar-actions">
                    <button onClick={this.props.stopTimer} className="btn btn-primary pull-left">
                        Stop
                    </button>
                    <button onClick={this.props.showActivityList} className="btn btn-default pull-right">
                        <span className="icon icon-cog"></span>
                    </button>
                </div>
            </footer>
        </div>
    }
};
