import { timer } from '../../src/reducers/timer';
import { startTimer, stopTimer } from '../../src/actions';
import { deepFreeze } from '../../src/util/deepFreeze';
import { now } from '../../src/util/now';
const { expect } = require('chai');

describe('reducers/activities', () => {
    it('should return initial state for unknown action', () => {
        expect(timer(undefined, {
            type: 'foo',
        })).to.deep.equal({
            panel: 'TimerForm',
            activities: [],
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
        expect(nextState).to.deep.equal({
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
        expect(nextState).to.deep.equal({
            panel: 'TimerForm',
            activities: [{
                id: 1,
                name: 'Hiking',
            }, {
                id: 2,
                name: 'Biking',
                trackedTime: 10,
            }],
        });
    });
});