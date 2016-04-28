import { activities } from './activities';
import { panel } from './panel';
import { START_TIMER_TYPE, STOP_TIMER_TYPE, switchPanel } from '../actions';
import { now } from '../util/now';

interface State {
    panel?: string,
    currentActivity?: any,
    activityStartTime?: number,
    activities?: any[]
}

export const timer = (state: State, action): State => {
    if (state === undefined) {
        state = {};
    }
    if (action.type === START_TIMER_TYPE) {
        return Object.assign({}, state, {
            panel: panel(state.panel, switchPanel('TimerDisplay')),
            currentActivity: state.activities.filter((activity) => activity.id === action.id )[0],
            activityStartTime: now()
        });
    }

    if (action.type === STOP_TIMER_TYPE) {
        const elapsedTime = now() - state.activityStartTime;

        const newState = Object.assign({}, state, {
            panel: panel(state.panel, switchPanel('TimerForm')),
            activities: state.activities.map((activity) => {
                if (activity.id === state.currentActivity.id) {
                    return Object.assign({}, activity, {
                        trackedTime: (activity.trackedTime || 0) + elapsedTime
                    });
                }
                return activity;
            })
        });

        delete newState.currentActivity;
        delete newState.activityStartTime;

        return newState;
    }

    return Object.assign({}, state, {
        panel: panel(state.panel, action),
        activities: activities(state.activities, action)
    });
};