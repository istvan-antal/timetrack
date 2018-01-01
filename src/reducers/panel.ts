import { SWITCH_PANEL_TYPE } from '../actions';

// tslint:disable-next-line:no-any
export const panel = (state: any, action: { type: string; panel?: string }) => {
    if (state === undefined) {
        state = 'TimerForm';
    }
    if (action.type !== SWITCH_PANEL_TYPE) {
        return state;
    }

    return action.panel;
};