import * as React from 'react';
import { ActivityRow } from './ActivityRow';
import { Activity } from '../entities';

interface Props {
    activities: Array<{
        id: number;
        name: string;
        trackedTime?: number;
    }>;
    addActivityAction(name: string): void;
    deleteActivityAction(id: number): void;
    showActivity(activity: Activity): void;
    goBack(): void;
}

export class ActivityList extends React.Component<Props> {
    // tslint:disable-next-line:no-any
    addActivity(event: any) {
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
                deleteActivityAction={() => { this.props.deleteActivityAction(activity.id); }}
                showActivity={this.props.showActivity}
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
                                <th>Today</th>
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
                                <td></td>
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