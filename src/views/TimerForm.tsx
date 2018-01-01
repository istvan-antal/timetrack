import * as React from 'react';
import { Activity } from '../entities';

interface ComponentProps {
    activities: Activity[];
    showActivityList: () => void;
    startTimer: (id: number) => void;
}

export class TimerForm extends React.Component<ComponentProps> {
    private activityIdSelect: HTMLSelectElement;
    startTimer() {
        const id = +this.activityIdSelect.value;
        if (!id) {
            return;
        }
        this.props.startTimer(id);
    }
    render() {
        return (
        <div className="window">
            <div className="window-content">
                <div className="padded-more">
                    <form>
                        <select ref={node => this.activityIdSelect = node!} className="form-control">
                            <option/>
                        {this.props.activities.map((activity, index) => (
                            <option value={activity.id} key={index}>{activity.name}</option>
                        ))}
                        </select>
                    </form>
                </div>
            </div>
            <footer className="toolbar toolbar-footer">
                <div className="toolbar-actions">
                    <button onClick={this.startTimer.bind(this)} className="btn btn-primary pull-left">
                        Start
                    </button>
                    <button onClick={this.props.showActivityList} className="btn btn-default pull-right">
                        <span className="icon icon-list"></span>
                    </button>
                </div>
            </footer>
        </div>
        );
    }
}
