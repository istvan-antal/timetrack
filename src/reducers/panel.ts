import { SWITCH_PANEL_TYPE } from '../actions';

export const panel = (state, action: { type: string; panel?: string }) => {
    if (state === undefined) {
        state = 'TimerForm';
    }
    if (action.type !== SWITCH_PANEL_TYPE) {
        return state;
    }

    return action.panel;
};