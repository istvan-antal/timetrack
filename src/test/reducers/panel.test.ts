import { panel } from '../../reducers/panel';
import { switchPanel } from '../../actions';

describe('reducers/panel', () => {
    it('should return initial state for unknown action', () => {
        expect(panel(undefined, {
            type: 'foo',
            panel: 'bar',
        })).toEqual('TimerForm');
    });

    it('should update panel property on switch', () => {
        expect(
            panel('TimerForm', switchPanel('TimerDisplay')),
        ).toEqual('TimerDisplay');
    });
});