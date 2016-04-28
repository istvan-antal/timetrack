import { createStore, applyMiddleware } from 'redux';
import { remote } from 'electron';
import { PeriodStorage } from './PeriodStorage';
import { timer } from './reducers/timer';
import { populateTrackedTime, STOP_TIMER_TYPE } from './actions';
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

    const store = createStore(timer, initialState, applyMiddleware(periodAddMiddleware, stateSaveMiddleware));

    const timeTracked: {
        [key: number]: number
    } = {};

    periodList.fetchPeriods((activity, startTime, elapsedTime) => {
        if (!timeTracked[activity.id]) {
            timeTracked[activity.id] = 0;
        }
        timeTracked[activity.id] += elapsedTime;
    }, () => {
        store.dispatch(populateTrackedTime(timeTracked));
    });

    return store;
}