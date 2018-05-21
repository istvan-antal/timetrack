import React = require('react');
import { connect } from 'react-redux';
import { Activity } from './entities';
import {
    addActivity, deleteActivity, switchPanel,
    startTimer, stopTimer,
} from './actions';
import { TimerForm } from './views/TimerForm';
import { TimerDisplay } from './views/TimerDisplay';
import { ActivityList } from './views/ActivityList';

const { remote } = require('electron');
const platform = remote.getGlobal('process').platform;

interface ComponentProps {
    panel: string;
    currentActivity?: Activity;
    activityStartTime?: number;
    activities: Activity[];
    addActivity: (name: string) => void;
    deleteActivity: (id: number) => void;
    showActivityList: () => void;
    showTimerForm: () => void;
    showDisplay: () => void;
    startTimer: (id: number) => void;
    stopTimer: () => void;
}

class App extends React.Component<ComponentProps> {
    // tslint:disable-next-line:no-any
    constructor(props: ComponentProps, context: any) {
        super(props, context);
    }
    render() {
        if (this.props.panel === 'ActivityList') {
            // tslint:disable-next-line:no-magic-numbers
            remote.getCurrentWindow().setSize(500, 300, true);
            let goBack = this.props.showTimerForm;

            if (this.props.currentActivity) {
                goBack = this.props.showDisplay;
            }

            return <ActivityList
                activities={this.props.activities}
                addActivityAction={this.props.addActivity}
                deleteActivityAction={this.props.deleteActivity}
                goBack={goBack}
            />;
        }

        let width = 300;
        let height = 118;

        if (platform === 'win32') {
            // tslint:disable-next-line:no-magic-numbers
            width *= 1.5;
            // tslint:disable-next-line:no-magic-numbers
            height *= 1.5;
        }
        // tslint:disable-next-line:no-magic-numbers
        remote.getCurrentWindow().setSize(width, height, true);

        if (this.props.panel === 'TimerDisplay') {
            return <TimerDisplay
                startTime={this.props.activityStartTime!}
                activity={this.props.currentActivity!}
                stopTimer={this.props.stopTimer}
                showActivityList={this.props.showActivityList}
            />;
        }

        return <TimerForm
            activities={this.props.activities}
            showActivityList={this.props.showActivityList}
            startTimer={this.props.startTimer}
        />;
    }
}

// tslint:disable-next-line:no-any
const mapDispatchToProps = (dispatch: any) => ({
    addActivity: (name: string) => {
        dispatch(addActivity(name));
    },
    deleteActivity: (id: number) => {
        dispatch(deleteActivity(id));
    },
    showActivityList: () => {
        dispatch(switchPanel('ActivityList'));
    },
    showTimerForm: () => {
        dispatch(switchPanel('TimerForm'));
    },
    showDisplay: () => {
        dispatch(switchPanel('TimerDisplay'));
    },
    startTimer: (id: number) => {
        dispatch(startTimer(id));
    },
    stopTimer: () => {
        dispatch(stopTimer());
    },
});

export default connect(state => state, mapDispatchToProps)(App);
