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
    showActivity(activity: Activity): void;
}

// tslint:disable-next-line:variable-name
export const ActivityRow = ({ activity, deleteActivityAction, showActivity }: Props) => (
    <tr key={activity.id}>
        <td onClick={() => { showActivity(activity); }}>
            {activity.name}
        </td>
        <td>
            {activity.trackedTime ? formatElapsedSeconds(activity.trackedTime) : 'N/A'}
        </td>
        <td>{activity.trackedTimeToday ? formatElapsedSeconds(activity.trackedTimeToday) : 'N/A'}</td>
        <td>
            <span onClick={deleteActivityAction} className="icon icon-cancel-circled"></span>
        </td>
    </tr>
);