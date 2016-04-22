import React = require('react');
import { remote } from 'electron';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Activity } from './entities';
import { addActivity, deleteActivity } from './actions';
import { TimerForm } from './TimerForm';
import { ActivityList } from './ActivityList';

interface ComponentProps {
    panel: string
    activities: Activity[],
    addActivity: (name:string) => any,
    deleteActivity: (id:number) => any
}

interface ComponentState {
    panel: string
}

class App extends React.Component<ComponentProps, ComponentState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            panel: 'TimerForm'
        };
    }
    showSettings() {
        this.setState({
            panel: 'ActivityList'
        });
    }
    showTimerForm() {
        this.setState({
            panel: 'TimerForm'
        });
    }
    render() {
        if (this.state.panel === 'ActivityList') {
            remote.getCurrentWindow().setSize(500, 300, true);
            return <ActivityList
                activities={this.props.activities}
                showTimerFormAction={this.showTimerForm.bind(this)}
                addActivityAction={this.props.addActivity}
                deleteActivityAction={this.props.deleteActivity}
            />
        }

        remote.getCurrentWindow().setSize(300, 118, true);
        return <TimerForm activities={this.props.activities} showSettingsAction={this.showSettings.bind(this)}/>
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addActivity: (name) => {
            dispatch(addActivity(name));
        },
        deleteActivity: (id) => {
            dispatch(deleteActivity(id));
        }
    };
}

export = connect((state) => {
    return state;
}, mapDispatchToProps)(App);
