import React = require('react');
import { remote } from 'electron';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Activity } from './entities';
import { addActivity, deleteActivity, showActivityList, showTimerForm } from './actions';
import { TimerForm } from './TimerForm';
import { ActivityList } from './ActivityList';

interface ComponentProps {
    panel: string
    activities: Activity[],
    addActivity: (name:string) => any,
    deleteActivity: (id:number) => any,
    showActivityList: () => any,
    showTimerForm: () => any
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
        return <TimerForm
            activities={this.props.activities}
            showActivityList={this.props.showActivityList}
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
            dispatch(showActivityList());
        },
        showTimerForm: () => {
            dispatch(showTimerForm());
        }
    };
}

export = connect((state) => {
    return state;
}, mapDispatchToProps)(App);
