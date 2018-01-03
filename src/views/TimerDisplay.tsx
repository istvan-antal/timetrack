import * as React from 'react';
const { ipcRenderer } = require('electron');
import { Activity } from '../entities';
import { formatElapsedSeconds } from '../util/formatElapsedSeconds';

interface ComponentProps {
    startTime: number;
    activity: Activity;
    showActivityList: () => void;
    stopTimer: () => void;
}

export class TimerDisplay extends React.Component<ComponentProps, { timeDisplay: string }> {
    private ticker: NodeJS.Timer;
    private notificationTicker: NodeJS.Timer;
    // tslint:disable-next-line:no-any
    constructor(props: ComponentProps, context: any) {
        super(props, context);
        // TODO: calculate this to prevent "flicker"
        this.state = {
            timeDisplay: '00:00:00',
        };
    }
    componentWillMount() {
        this.ticker = setInterval(() => {
            // tslint:disable-next-line:no-magic-numbers
            const currentTime = Math.floor((new Date()).getTime() / 1000);
            const timeDiff = currentTime - this.props.startTime;
            this.setState({
                timeDisplay: formatElapsedSeconds(timeDiff),
            });
        // tslint:disable-next-line:no-magic-numbers
        }, 1000);

        const updateNotificationText = () => {
            // tslint:disable-next-line:no-magic-numbers
            const currentTime = Math.floor((new Date()).getTime() / 1000);
            const timeDiff = currentTime - this.props.startTime;
            // tslint:disable-next-line:no-magic-numbers
            let displayText = `${Math.floor(timeDiff % 3600 / 60)}`;
            // tslint:disable-next-line:no-magic-numbers
            const hours = Math.floor(timeDiff / 3600);
            if (hours) {
                displayText = `${hours}.${displayText}`;
            }
            // tslint:disable-next-line:no-magic-numbers
            ipcRenderer.send('setNotificationText', displayText);
            // tslint:disable-next-line:no-magic-numbers
        };

        // tslint:disable-next-line:no-magic-numbers
        this.notificationTicker = setInterval(updateNotificationText, 60000);
        updateNotificationText();
    }
    componentWillUnmount() {
        clearInterval(this.ticker);
        clearTimeout(this.notificationTicker);
        ipcRenderer.send('setNotificationText', '');
    }
    render() {
        return (
        <div className="window">
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
        );
    }
}
