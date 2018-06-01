import { timer } from '../../reducers/timer';
import { startTimer, stopTimer } from '../../actions';
import { deepFreeze } from '../../util/deepFreeze';
import { now } from '../../util/now';

describe('reducers/activities', () => {
    it('should return initial state for unknown action', () => {
        expect(timer(undefined, {
            type: 'foo',
        })).toEqual({
            panel: 'TimerForm',
            activities: [],
            periods: {},
        });
    });

    it('should start timer', () => {
        const initialState = deepFreeze({
            panel: 'TimerForm',
            activities: [{
                id: 1,
                name: 'Hiking',
            }, {
                id: 2,
                name: 'Biking',
            }],
        });

        const currentTime = now();
        // tslint:disable-next-line:no-magic-numbers
        const nextState = timer(initialState, startTimer(2));
        expect(nextState).toEqual({
            panel: 'TimerDisplay',
            activityStartTime: currentTime,
            currentActivity: {
                id: 2,
                name: 'Biking',
            },
            activities: [{
                id: 1,
                name: 'Hiking',
            }, {
                id: 2,
                name: 'Biking',
            }],
        });
    });

    it('should stop timer', () => {
        const currentTime = now();
        const initialState = deepFreeze({
            panel: 'TimerDisplay',
            // tslint:disable-next-line:no-magic-numbers
            activityStartTime: currentTime - 10,
            currentActivity: {
                id: 2,
                name: 'Biking',
            },
            activities: [{
                id: 1,
                name: 'Hiking',
            }, {
                id: 2,
                name: 'Biking',
            }],
        });

        const nextState = timer(initialState, stopTimer());
        expect(nextState).toEqual({
            panel: 'TimerForm',
            activities: [{
                id: 1,
                name: 'Hiking',
            }, {
                id: 2,
                name: 'Biking',
                trackedTime: 10,
                trackedTimeToday: 10,
            }],
        });
    });
});