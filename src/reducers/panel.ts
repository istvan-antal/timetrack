import { WindowActions } from '../actions';

export const panel = (state = 'TimerForm', action: { type: string; panel?: string }) => {
    if (action.type !== WindowActions.SwitchPanel) {
        return state;
    }

    return action.panel;
};