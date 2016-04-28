import React = require('react');
import { Activity } from '../entities';
import { ActivityRow } from '../views/ActivityRow';

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
        const activities = this.props.activities.map((activity, index) => {
            return (
                <ActivityRow activity={activity} deleteActivityAction={ () => this.props.deleteActivityAction(activity.id)  } key={index}/>
            );
        })
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