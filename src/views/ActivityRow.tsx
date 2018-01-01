import * as React from 'react';
import { formatElapsedSeconds } from '../util/formatElapsedSeconds';

interface Activity {
    id: number;
    name: string;
    trackedTime?: number;
    trackedTimeToday?: number;
}

interface Props {
    activity: Activity;
    deleteActivityAction(): void;
}

// tslint:disable-next-line:variable-name
export const ActivityRow = ({ activity, deleteActivityAction }: Props) => (
    <tr key={activity.id}>
        <td>{activity.name}</td>
        <td>{activity.trackedTime ? formatElapsedSeconds(activity.trackedTime) : 'N/A'}</td>
        <td>{activity.trackedTimeToday ? formatElapsedSeconds(activity.trackedTimeToday) : 'N/A'}</td>
        <td>
            <span onClick={deleteActivityAction} className="icon icon-cancel-circled"></span>
        </td>
    </tr>
);