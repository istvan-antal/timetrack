import { activities } from './activities';
import { panel } from './panel';
import { START_TIMER_TYPE, STOP_TIMER_TYPE, switchPanel } from '../actions';
import { now } from '../util/now';

interface State {
    panel?: string;
    // tslint:disable-next-line:no-any
    currentActivity?: any;
    activityStartTime?: number;
    // tslint:disable-next-line:no-any
    activities?: any[];
}

// tslint:disable-next-line:no-any
export const timer = (state: State | undefined, action: any): State => {
    if (state === undefined) {
        state = {};
    }
    if (action.type === START_TIMER_TYPE) {
        return {
            ...state,
            panel: panel(state.panel, switchPanel('TimerDisplay')),
            currentActivity: state.activities!.filter(activity => activity.id === action.id )[0],
            activityStartTime: now(),
        };
    }

    if (action.type === STOP_TIMER_TYPE) {
        const elapsedTime = now() - state.activityStartTime!;

        const newState = {
            ...state,
            panel: panel(state.panel, switchPanel('TimerForm')),
            activities: state.activities!.map(activity => {
                if (activity.id === state!.currentActivity.id) {
                    return {
                        ...activity,
                        trackedTime: (activity.trackedTime as number || 0) + elapsedTime,
                        trackedTimeToday: (activity.trackedTimeToday as number || 0) + elapsedTime,
                    };
                }
                return activity;
            }),
        };

        delete newState.currentActivity;
        delete newState.activityStartTime;

        return newState;
    }

    return {
        ...state,
        panel: panel(state.panel, action),
        activities: activities(state.activities, action),
    };
};