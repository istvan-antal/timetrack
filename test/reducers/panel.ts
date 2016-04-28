import { panel } from '../../src/reducers/panel';
import { switchPanel } from '../../src/actions';
const { expect } = require('chai');

describe('reducers/panel', () => {
    it('should return initial state for unknown action', () => {
        expect(panel(undefined, {
            type: 'foo',
            panel: 'bar'
        })).to.deep.equal('TimerForm');
    });

    it('should update panel property on switch', () => {
        expect(
            panel('TimerForm', switchPanel('TimerDisplay'))
        ).to.deep.equal('TimerDisplay');
    });
});