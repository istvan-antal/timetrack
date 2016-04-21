import React = require('react');
import { Activity } from './entities';

interface ComponentProps {
    activities: Activity[]
    showTimerFormAction: ()=>any
    addActivityAction: (name:string) => any
}

export class ActivityList extends React.Component<ComponentProps, {}> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activityName: ''
        };
    }
    addActivity(e) {
        if (e.key === 'Enter') {
            this.props.addActivityAction(e.target.value);
            e.target.value = '';
        }
    }
    render() {
        return (
            <div className="window">
                <div className="window-content">
                <table className="table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.activities.map((activity, index) => {
                        return (
                        <tr key={activity.id}>
                            <td>{activity.name}</td>
                        </tr>
                    )})}
                        <tr>
                            <td><input onKeyPress={this.addActivity.bind(this)} type="text"/></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <footer className="toolbar toolbar-footer">
                    <div className="toolbar-actions">
                        <button onClick={this.props.showTimerFormAction} className="btn btn-default pull-right">
                            <span className="icon icon-left-circled"></span>
                        </button>
                    </div>
                </footer>
            </div>
        );
    }
}