import React = require('react');
import { Activity } from './entities';
import { formatElapsedSeconds } from './formatElapsedSeconds';

interface ComponentProps {
    activities: Activity[]
    addActivityAction: (name:string) => any
    deleteActivityAction: (id:number) => any,
    showTimerForm: () => any
}

export class ActivityList extends React.Component<ComponentProps, {}> {
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
                            <th>Time tracked</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.activities.map((activity, index) => {
                        let trackedTime = 'N/A';
                        if (activity.trackedTime) {
                            trackedTime = formatElapsedSeconds(activity.trackedTime);
                        }
                        return (
                        <tr key={activity.id}>
                            <td>{activity.name}</td>
                            <td>{trackedTime}</td>
                            <td><span onClick={this.props.deleteActivityAction.bind(null, activity.id)} className="icon icon-cancel-circled"></span></td>
                        </tr>
                    )})}
                        <tr>
                            <td><input onKeyPress={this.addActivity.bind(this)} type="text"/></td>
                            <td></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <footer className="toolbar toolbar-footer">
                    <div className="toolbar-actions">
                        <button onClick={this.props.showTimerForm} className="btn btn-default pull-right">
                            <span className="icon icon-left-circled"></span>
                        </button>
                    </div>
                </footer>
            </div>
        );
    }
}