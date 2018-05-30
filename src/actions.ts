import { Activity } from './entities';

export const ADD_ACTIVITY_TYPE = 'ADD_ACTIVITY';
export const DELETE_ACTIVITY_TYPE = 'DELETE_ACTIVITY';
export const START_TIMER_TYPE = 'START_TIMER';
export const STOP_TIMER_TYPE = 'STOP_TIMER';
export const TRACKED_TIME_POPULATE = 'TRACKED_TIME_POPULATE';

export enum WindowActions {
    SwitchPanel = 'SWITCH_PANEL',
    ShowActivity = 'showActivity',
}

export enum ActivityActions {
    PopulatePeriods = 'populatePeriods',
}

export const addActivity = (name: string) =>  ({
    type: ADD_ACTIVITY_TYPE,
    name,
});

export const deleteActivity = (id: number) =>  ({
    type: DELETE_ACTIVITY_TYPE,
    id,
});

export const switchPanel = (panel: string) => ({
    type: WindowActions.SwitchPanel,
    panel,
});

export const showActivity = (activity: Activity) => ({
    type: WindowActions.ShowActivity,
    activityId: activity.id,
});

export const startTimer = (id: number) => ({
    type: START_TIMER_TYPE,
    id,
});

export const stopTimer = () =>  ({
    type: STOP_TIMER_TYPE,
});

export const populateTrackedTime = (
    trackedTime: { [key: number]: [number, number] },
    trackedPeriods: { [key: number]: Array<[number, number]> },
) => ({
    type: TRACKED_TIME_POPULATE,
    trackedTime,
    trackedPeriods,
});