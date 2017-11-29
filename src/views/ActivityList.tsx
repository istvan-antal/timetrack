import * as React from 'react';
import { ActivityRow } from './ActivityRow';

// tslint:disable-next-line:no-any
export class ActivityList extends React.Component<any, any> {
    addActivity(event) {
        const e = event;
        if (e.key === 'Enter') {
            this.props.addActivityAction(e.target.value);
            e.target.value = '';
        }
    }
    render() {
        const activities = this.props.activities.map((activity, index) => (
            <ActivityRow
                activity={activity}
                deleteActivityAction={() => this.props.deleteActivityAction(activity.id)}
                key={index}
            />
        ));

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
                            {activities}
                            <tr>
                                <td>
                                    <input onKeyPress={this.addActivity.bind(this)} type="text" />
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <footer className="toolbar toolbar-footer">
                    <div className="toolbar-actions">
                        <button onClick={this.props.goBack} className="btn btn-default pull-right">
                            <span className="icon icon-left-circled"></span>
                        </button>
                    </div>
                </footer>
            </div>
        );
    }
}