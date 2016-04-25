import { createStore } from 'redux';
import { remote } from 'electron';
import {
    ADD_ACTIVITY_TYPE, DELETE_ACTIVITY_TYPE,
    SHOW_ACTIVITY_LIST_TYPE, SHOW_TIMER_FORM_TYPE,
    START_TIMER_TYPE, STOP_TIMER_TYPE
} from './actions';
const fs = remote.require('fs');
const app = remote.app;

let userDataPath = app.getPath('userData');
let entitiesPath = userDataPath  + '/timetrack';
let uiStateFile = entitiesPath + '/ui.state.json';

function saveState(state) {
    // TODO: add locking
    fs.writeFile(uiStateFile, JSON.stringify(state));
};

export default function configureStore() {
    // TODO: add auto file creation logic
    let initialState = JSON.parse(fs.readFileSync(uiStateFile));
    return createStore((state, action) => {
        switch (action.type) {
            case START_TIMER_TYPE:
            state = Object.assign({}, state, {
                panel: 'TimerDisplay',
                activityStartTime: (new Date()).getTime(),
                currentActivity: state.activities.filter((activity) => {
                    return activity.id === action.id;
                })[0]
            });
            saveState(state);
            break;
            case STOP_TIMER_TYPE:
            state = Object.assign({}, state, {
                panel: 'TimerForm',
                currentActivity: null
            });
            saveState(state);
            break;
            case SHOW_ACTIVITY_LIST_TYPE:
            state = Object.assign({}, state, {
                panel: 'ActivityList'
            });
            saveState(state);
            break;
            case SHOW_TIMER_FORM_TYPE:
            state = Object.assign({}, state, {
                panel: 'TimerForm'
            });
            saveState(state);
            break;
            case DELETE_ACTIVITY_TYPE:
            state = Object.assign({}, state, {
                activities: state.activities.filter((activity) => {
                    return activity.id !== action.id;
                })
            });
            saveState(state);
            break;
            case ADD_ACTIVITY_TYPE:
            state = Object.assign({}, state, {
                activities: state.activities.concat([{
                    id: (new Date()).getTime(),
                    name: action.name
                }])
            });
            saveState(state);
        }

        return state;
    }, initialState)
}