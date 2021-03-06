import { activities } from './activities';
import { panel } from './panel';
import { START_TIMER_TYPE, STOP_TIMER_TYPE, switchPanel, WindowActions } from '../actions';
import { now } from '../util/now';
import { periods, PeriodListView } from './periods';
import { Activity } from '../entities';

interface State {
    panel?: string;
    selectedActivity?: Activity;
    // tslint:disable-next-line:no-any
    currentActivity?: any;
    activityStartTime?: number;
    // tslint:disable-next-line:no-any
    activities?: any[];
    periods: PeriodListView;
}

// tslint:disable-next-line:no-any
export const timer = (state: State | undefined, action: any): State => {
    if (state === undefined) {
        state = { periods: {} };
    }
    if (action.type === START_TIMER_TYPE) {
        return {
            ...state,
            panel: panel(state.panel, switchPanel('TimerDisplay')),
            currentActivity: state.activities!.filter(activity => activity.id === action.id )[0],
            activityStartTime: now(),
        };
    }

    if (action.type === WindowActions.ShowActivity) {
        return {
            ...state,
            panel: panel(state.panel, switchPanel('ActivityView')),
            selectedActivity: state.activities!.filter(activity => activity.id === action.activityId)[0],
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
        periods: periods(state.periods, action),
    };
};