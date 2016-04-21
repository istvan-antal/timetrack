import React = require('react');
import { Activity } from './entities';

interface ComponentProps {
    activities: Activity[]
    showTimerFormAction: ()=>any
}

export class ActivityList extends React.Component<ComponentProps, any> {
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
                            <td><input type="text"/></td>
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