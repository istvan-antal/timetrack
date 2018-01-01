import {
    ADD_ACTIVITY_TYPE, TRACKED_TIME_POPULATE, DELETE_ACTIVITY_TYPE,
} from '../actions';
import { now } from '../util/now';

interface ActivityAction {
    type: string;
    id?: number;
    name?: string;
    trackedTime?: { [key: number]: [number, number] };
}

// tslint:disable-next-line:no-any
export const activities = (state: any , action: ActivityAction) => {
    if (state === undefined) {
        state = [];
    }
    // tslint:disable-next-line:switch-default
    switch (action.type) {
        case ADD_ACTIVITY_TYPE:
        return [...state, { id: now(), name: action.name }];
        case TRACKED_TIME_POPULATE:
        // tslint:disable-next-line:no-any
        return state.map((activity: any) => {
            if (action.trackedTime![activity.id]) {
                return {
                    ...activity,
                    trackedTime: action.trackedTime![activity.id][0],
                    trackedTimeToday: action.trackedTime![activity.id][1],
                };
            }
            return activity;
        });
        case DELETE_ACTIVITY_TYPE:
            // tslint:disable-next-line:no-any
            return state.filter((activity: any) => activity.id !== action.id );
    }
    return state;
};