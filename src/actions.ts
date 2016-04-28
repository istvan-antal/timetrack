export const ADD_ACTIVITY_TYPE = 'ADD_ACTIVITY';
export const DELETE_ACTIVITY_TYPE = 'DELETE_ACTIVITY';
export const SWITCH_PANEL_TYPE = 'SWITCH_PANEL';
export const START_TIMER_TYPE = 'START_TIMER';
export const STOP_TIMER_TYPE = 'STOP_TIMER';
export const TRACKED_TIME_POPULATE = 'TRACKED_TIME_POPULATE';

export const addActivity = (name: string) =>  {
    return {
        type: ADD_ACTIVITY_TYPE,
        name
    };
}

export const deleteActivity = (id: number) =>  {
    return {
        type: DELETE_ACTIVITY_TYPE,
        id
    };
}

export const switchPanel = (panel: string) =>  {
    return {
        type: SWITCH_PANEL_TYPE,
        panel
    };
}

export const startTimer = (id: number) =>  {
    return {
        type: START_TIMER_TYPE,
        id
    };
}

export const stopTimer = () =>  {
    return {
        type: STOP_TIMER_TYPE
    };
}

export const populateTrackedTime = (trackedTime: { [key: number]: number }) => {
    return {
        type: TRACKED_TIME_POPULATE,
        trackedTime
    };
};