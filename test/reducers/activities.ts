import { activities } from '../../src/reducers/activities';
import {
    switchPanel, addActivity, populateTrackedTime,
    deleteActivity
} from '../../src/actions';
import { deepFreeze } from '../../src/deepFreeze';
const { expect } = require('chai');

describe('reducers/activities', () => {
    it('should return initial state for unknown action', () => {
        expect(activities(undefined, {
            type: 'foo',
        })).to.deep.equal([]);
    });

    it('should append an actitvity', () => {
        const initialState = deepFreeze([]);
        const nextState = activities(initialState, addActivity('Hiking'));
        expect(nextState).to.be.an('array');
        expect(nextState).to.have.lengthOf(1);
        expect(nextState[0]).to.have.all.keys('id', 'name');
        expect(nextState[0]).to.have.property('name', 'Hiking');
    });

    it('should populate time', () => {
        const initialState = deepFreeze([{
            id: 1,
            name: 'Hiking'
        }, {
            id: 2,
            name: 'Biking'
        }, {
            id: 10,
            name: 'Cooking'
        }]);
        const expectedSate = deepFreeze([{
            id: 1,
            name: 'Hiking'
        }, {
            id: 2,
            name: 'Biking',
            trackedTime: 302
        }, {
            id: 10,
            name: 'Cooking',
            trackedTime: 3600
        }]);
        const nextState = activities(initialState, populateTrackedTime({
            2: 302,
            10: 3600
        }));
        expect(nextState).to.deep.equal(expectedSate);
    });

    it('should delete activity', () => {
        const initialState = deepFreeze([{
            id: 1,
            name: 'Hiking'
        }, {
            id: 2,
            name: 'Biking'
        }, {
            id: 10,
            name: 'Cooking'
        }]);
        const expectedSate = deepFreeze([{
            id: 1,
            name: 'Hiking'
        }, {
            id: 10,
            name: 'Cooking'
        }]);
        const nextState = activities(initialState, deleteActivity(2));
        expect(nextState).to.deep.equal(expectedSate);
    });
});