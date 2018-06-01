import * as React from 'react';
import { DateTime } from 'luxon';
import { Activity } from '../entities';
import formatDuration from '../util/formatDuration';
// import { ActivityRow } from './ActivityRow';

interface Props {
    /* activities: Array<{
        id: number;
        name: string;
        trackedTime?: number;
    }>;
    addActivityAction(name: string): void;
    deleteActivityAction(id: number): void;*/
    activity: Activity;
    goBack(): void;
}

export class ActivityView extends React.Component<Props> {
    // tslint:disable-next-line:no-any
    /* addActivity(event: any) {
        const e = event;
        if (e.key === 'Enter') {
            this.props.addActivityAction(e.target.value);
            e.target.value = '';
        }
    }*/
    render() {
        return (
            <div className="window">
                <div className="window-content">
                    <div style={{ width: '100%' }}>
                        <h1 className="title">{this.props.activity.name}</h1>
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Duration</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.activity.periods.sort((a, b) => b.startTime - a.startTime)
                                    .map((period, index) => (
                                        <tr key={index}>
                                            <td>
                                                {DateTime
                                                    // tslint:disable-next-line:no-magic-numbers
                                                    .fromMillis(period.startTime * 1000)
                                                    .toFormat('ccc d LLL HH:mm')}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                {formatDuration(period.duration)}
                                            </td>
                                            <td></td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td>
                                        <input onKeyPress={/*this.addActivity.bind(this)*/ undefined} type="text" />
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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