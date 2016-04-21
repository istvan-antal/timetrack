import React = require('react');
import { Activity } from './entities';

interface ComponentProps {
    showSettingsAction: ()=>any
    activities: Activity[]
}

export class TimerForm extends React.Component<ComponentProps, any> {
    render() {
        return <div className="window">
            <div className="window-content">
                <div className="padded-more">
                    <form>
                        <select className="form-control">
                        {this.props.activities.map((actitivity, index) => {
                            return <option key={index}>{actitivity.name}</option>
                        })}
                        </select>
                    </form>
                </div>
            </div>
            <footer className="toolbar toolbar-footer">
                <div className="toolbar-actions">
                    <button className="btn btn-primary pull-left">
                        Start
                    </button>
                    <button onClick={this.props.showSettingsAction} className="btn btn-default pull-right">
                        <span className="icon icon-cog"></span>
                    </button>
                </div>
            </footer>
        </div>
    }
};
