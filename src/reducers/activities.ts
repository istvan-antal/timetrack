import {
    ADD_ACTIVITY_TYPE, TRACKED_TIME_POPULATE, DELETE_ACTIVITY_TYPE
} from '../actions';
import { now } from '../util/now';

interface ActivityAction {
    type: string
    id?: number
    name?: string
    trackedTime?: { [key: number]: number }
}

export const activities = (state , action: ActivityAction) => {
    if (state === undefined) {
        state = [];
    }
    switch (action.type) {
        case ADD_ACTIVITY_TYPE:
        return [...state, { id: now(), name: action.name }];
        case TRACKED_TIME_POPULATE:
        return state.map((activity) => {
            if (action.trackedTime[activity.id]) {
                return Object.assign(
                    {},
                    activity,
                    { trackedTime: action.trackedTime[activity.id] }
                );
            }
            return activity;
        });
        case DELETE_ACTIVITY_TYPE:
            return state.filter((activity) => activity.id !== action.id );
    }
    return state;
};