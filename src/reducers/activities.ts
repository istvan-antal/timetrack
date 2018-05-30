import {
    ADD_ACTIVITY_TYPE, TRACKED_TIME_POPULATE, DELETE_ACTIVITY_TYPE, ActivityActions,
} from '../actions';
import { now } from '../util/now';

interface ActivityAction {
    type: string;
    id?: number;
    name?: string;
    trackedTime?: { [key: number]: [number, number] };
    trackedPeriods?: {
        [key: number]: Array<[number, number]>;
    };
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
                console.log(action);
                return {
                    ...activity,
                    trackedTime: action.trackedTime![activity.id][0],
                    trackedTimeToday: action.trackedTime![activity.id][1],
                    periods: action.trackedPeriods![activity.id].map(item => ({
                        startTime: item[0],
                        duration: item[1],
                    })),
                };
            }
            return activity;
        });
        case ActivityActions.PopulatePeriods:
            break;
        case DELETE_ACTIVITY_TYPE:
            // tslint:disable-next-line:no-any
            return state.filter((activity: any) => activity.id !== action.id );
    }
    return state;
};