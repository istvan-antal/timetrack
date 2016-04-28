import React = require('react');
import { formatElapsedSeconds } from '../formatElapsedSeconds';

export const ActivityRow = (props) => {
    const activity = props.activity;
    const deleteActivityAction = props.deleteActivityAction;
    let trackedTime = 'N/A';
    if (activity.trackedTime) {
        trackedTime = formatElapsedSeconds(activity.trackedTime);
    }
    return (
        <tr key={activity.id}>
            <td>{activity.name}</td>
            <td>{trackedTime}</td>
            <td><span onClick={ deleteActivityAction } className="icon icon-cancel-circled"></span></td>
        </tr>
    );
};