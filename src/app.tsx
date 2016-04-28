import React = require('react');
import { remote } from 'electron';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Activity } from './entities';
import {
    addActivity, deleteActivity, switchPanel,
    startTimer, stopTimer
} from './actions';
import { TimerForm } from './TimerForm';
import { TimerDisplay } from './TimerDisplay';
import { ActivityList } from './ActivityList';

interface ComponentProps {
    panel: string
    currentActivity?: Activity,
    activityStartTime?: number,
    activities: Activity[],
    addActivity: (name:string) => any,
    deleteActivity: (id:number) => any,
    showActivityList: () => any,
    showTimerForm: () => any,
    startTimer: (id:number) => any,
    stopTimer: () => any,
}

class App extends React.Component<ComponentProps, {}> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        if (this.props.panel === 'ActivityList') {
            remote.getCurrentWindow().setSize(500, 300, true);
            return <ActivityList
                activities={this.props.activities}
                addActivityAction={this.props.addActivity}
                deleteActivityAction={this.props.deleteActivity}
                showTimerForm={this.props.showTimerForm}
            />
        }

        remote.getCurrentWindow().setSize(300, 118, true);

        if (this.props.panel === 'TimerDisplay') {
            return <TimerDisplay
                startTime={this.props.activityStartTime}
                activity={this.props.currentActivity}
                stopTimer={this.props.stopTimer}
                showActivityList={this.props.showActivityList}
            />
        }

        return <TimerForm
            activities={this.props.activities}
            showActivityList={this.props.showActivityList}
            startTimer={this.props.startTimer}
        />
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addActivity: (name) => {
            dispatch(addActivity(name));
        },
        deleteActivity: (id) => {
            dispatch(deleteActivity(id));
        },
        showActivityList: () => {
            dispatch(switchPanel('ActivityList'));
        },
        showTimerForm: () => {
            dispatch(switchPanel('TimerForm'));
        },
        startTimer: (id) => {
            dispatch(startTimer(id));
        },
        stopTimer: () => {
            dispatch(stopTimer());
        }
    };
}

export = connect((state) => {
    return state;
}, mapDispatchToProps)(App);
