import { activities } from '../../reducers/activities';
import {
    // addActivity,/* populateTrackedTime,*/
    deleteActivity,
    populateTrackedTime,
} from '../../actions';
import { deepFreeze } from '../../util/deepFreeze';

describe('reducers/activities', () => {
    it('should return initial state for unknown action', () => {
        expect(activities(undefined, {
            type: 'foo',
        })).toEqual([]);
    });

    /* it('should append an actitvity', () => {
        const initialState = deepFreeze([]);
        const nextState = activities(initialState, addActivity('Hiking'));
        expect(nextState).to.be.an('array');
        expect(nextState).to.have.lengthOf(1);
        expect(nextState[0]).to.have.all.keys('id', 'name');
        expect(nextState[0]).to.have.property('name', 'Hiking');
    });*/

    it('should populate time', () => {
        const initialState = deepFreeze([{
            id: 1,
            name: 'Hiking',
        }, {
            id: 2,
            name: 'Biking',
        }, {
            id: 10,
            name: 'Cooking',
        }]);
        const expectedSate = deepFreeze([{
            id: 1,
            name: 'Hiking',
        }, {
            id: 2,
            name: 'Biking',
            trackedTime: 302,
            trackedTimeToday: 0,
            periods: [{ startTime: 0, duration: 302 }],
        }, {
            id: 10,
            name: 'Cooking',
            trackedTime: 3600,
            trackedTimeToday: 0,
            periods: [ { startTime: 0, duration: 3600 } ],
        }]);
        const nextState = activities(initialState, populateTrackedTime({
            // tslint:disable-next-line:no-magic-numbers
            2: [302, 0],
            // tslint:disable-next-line:no-magic-numbers
            10: [3600, 0],
        }, {
            // tslint:disable-next-line:no-magic-numbers
            2: [[0, 302]],
            // tslint:disable-next-line:no-magic-numbers
            10: [[0, 3600]],
        }));
        expect(nextState).toEqual(expectedSate);
    });

    it('should delete activity', () => {
        const initialState = deepFreeze([{
            id: 1,
            name: 'Hiking',
        }, {
            id: 2,
            name: 'Biking',
        }, {
            id: 10,
            name: 'Cooking',
        }]);
        const expectedSate = deepFreeze([{
            id: 1,
            name: 'Hiking',
        }, {
            id: 10,
            name: 'Cooking',
        }]);
        // tslint:disable-next-line:no-magic-numbers
        const nextState = activities(initialState, deleteActivity(2));
        expect(nextState).toEqual(expectedSate);
    });
});