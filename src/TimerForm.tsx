import React = require('react');
import { DataManager } from './DataManager';
import { Activity } from './entities';

interface ComponentProps {
    onStart: (selectedActivity: string) => void
};

interface ComponentState {
    activities: Activity[]
};

export = class TimerForm extends React.Component<ComponentProps, ComponentState> {
    refs: {
        [key: string]: (Element);
        activity: (HTMLSelectElement);
    }
    constructor() {
        super();
        this.state = { activities: [] };
    }
    componentWillMount() {
        let manager = new DataManager();
        manager.loadEntities('Activity', Activity).then((activities) => {
            this.setState({
                activities: activities
            })
        });
    }
    onStart(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onStart(this.refs['activity'].value);
    }
    render() {
        return (
            <form>
                <select ref="activity">
                    {this.state.activities.map((activity) => {
                        return <option key="{activity.id}" value="{activity.id}">{activity.name}</option>
                    })}
                </select>
                <button onClick={this.onStart.bind(this)}>Start</button>
            </form>
        );
    }
};
