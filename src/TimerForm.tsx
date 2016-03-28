import React = require('react');

interface ComponentProps {
    onStart: (selectedActivity: string) => void
};

interface ComponentState {

};

export = class TimerForm extends React.Component<ComponentProps, ComponentState> {
    refs: {
        [key: string]: (Element);
        activity: (HTMLSelectElement);
    }

    onStart(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.onStart(this.refs['activity'].value);
    }
    render() {
        return (
            <form>
                <select ref="activity">
                    <option value="1">Activity 1</option>
                </select>
                <button onClick={this.onStart.bind(this)}>Start</button>
            </form>
        );
    }
};
