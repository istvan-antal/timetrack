import { createStore, applyMiddleware } from 'redux';
import { remote } from 'electron';
import { PeriodStorage } from './PeriodStorage';
import {
    ADD_ACTIVITY_TYPE, DELETE_ACTIVITY_TYPE,
    SHOW_ACTIVITY_LIST_TYPE, SHOW_TIMER_FORM_TYPE,
    START_TIMER_TYPE, STOP_TIMER_TYPE, TRACKED_TIME_POPULATE
} from './actions';
const fs = remote.require('fs');
const app = remote.app;

const userDataPath = app.getPath('userData');
const uiStateFile = userDataPath + '/ui.state.json';
const periodListFile = userDataPath + '/periods.csv';
const periodList = new PeriodStorage(periodListFile);

function saveState(state) {
    // TODO: add locking
    fs.writeFile(uiStateFile, JSON.stringify(state));
};

export default function configureStore() {
    // TODO: add auto file creation logic
    let initialState;
    if (fs.existsSync(uiStateFile)) {
        initialState = JSON.parse(fs.readFileSync(uiStateFile));
    } else {
        initialState = { activities: [] };
    }

    function stateSaveMiddleware(store) {
        return (next) => (action) => {
            let returnValue = next(action)
            saveState(store.getState());
            return returnValue;
        };
    }

    function periodAddMiddleware(store) {
        return (next) => (action) => {
            if (action.type === STOP_TIMER_TYPE) {
                const state = store.getState();
                const now = Math.floor((new Date()).getTime() / 1000);
                const elapsedTime = now - state.activityStartTime;
                periodList.addPeriod(state.currentActivity, state.activityStartTime, elapsedTime);
            }

            return next(action);
        };
    }

    const store = createStore((state, action) => {
        switch (action.type) {
            case START_TIMER_TYPE:
            state = Object.assign({}, state, {
                panel: 'TimerDisplay',
                activityStartTime: Math.floor((new Date()).getTime() / 1000),
                currentActivity: state.activities.filter((activity) => {
                    return activity.id === action.id;
                })[0]
            });
            break;
            case STOP_TIMER_TYPE:
            const now = Math.floor((new Date()).getTime() / 1000);
            const elapsedTime = now - state.activityStartTime;

            state = Object.assign({}, state, {
                panel: 'TimerForm',
                currentActivity: null,
                activities: state.activities.map((activity) => {
                    if (activity.id === state.currentActivity.id) {
                        return Object.assign({}, activity, {
                            trackedTime: (activity.trackedTime || 0) + elapsedTime
                        });
                    }
                    return activity;
                })
            });
            break;
            case SHOW_ACTIVITY_LIST_TYPE:
            state = Object.assign({}, state, {
                panel: 'ActivityList'
            });
            break;
            case SHOW_TIMER_FORM_TYPE:
            state = Object.assign({}, state, {
                panel: 'TimerForm'
            });
            break;
            case DELETE_ACTIVITY_TYPE:
            state = Object.assign({}, state, {
                activities: state.activities.filter((activity) => {
                    return activity.id !== action.id;
                })
            });
            break;
            case ADD_ACTIVITY_TYPE:
            state = Object.assign({}, state, {
                activities: state.activities.concat([{
                    id: (new Date()).getTime(),
                    name: action.name
                }])
            });
            break;
            case TRACKED_TIME_POPULATE:
            state = Object.assign({}, state, {
                activities: state.activities.map((activity) => {
                    if (action.timeTracked[activity.id]) {
                        activity.trackedTime = action.timeTracked[activity.id];
                    }
                    return activity;
                })
            });
        }

        return state;
    }, initialState, applyMiddleware(periodAddMiddleware, stateSaveMiddleware));

    const timeTracked = {};

    periodList.fetchPeriods((activity, startTime, elapsedTime) => {
        if (!timeTracked[activity.id]) {
            timeTracked[activity.id] = 0;
        }
        timeTracked[activity.id] += elapsedTime;
    }, () => {
        store.dispatch({
            type: TRACKED_TIME_POPULATE,
            timeTracked: timeTracked
        });
    });

    return store;
}