import { createStore, applyMiddleware } from 'redux';
import { remote } from 'electron';
import { PeriodStorage } from './PeriodStorage';
import { timer } from './reducers/timer';
import { populateTrackedTime, STOP_TIMER_TYPE, stopTimer, startTimer } from './actions';
import * as moment from 'moment';
import { now } from './util/now';
const fs = remote.require('fs');
const app = remote.app;

const userDataPath = app.getPath('userData');
const uiStateFile = userDataPath + '/ui.state.json';
const periodListFile = userDataPath + '/periods.csv';
const periodList = new PeriodStorage(periodListFile);

// tslint:disable-next-line:no-any
const saveState = (state: any) => {
    // TODO: add locking
    fs.writeFile(uiStateFile, JSON.stringify(state));
};

export default () => {
    // TODO: add auto file creation logic
    let initialState;
    // tslint:disable-next-line:prefer-conditional-expression
    if (fs.existsSync(uiStateFile)) {
        initialState = JSON.parse(fs.readFileSync(uiStateFile));
    } else {
        initialState = { activities: [] };
    }

    // tslint:disable-next-line:no-shadowed-variable no-any
    const stateSaveMiddleware = (store: any) => (
        // tslint:disable-next-line:no-any
        (next: any) => (action: any) => {
            const returnValue = next(action);
            saveState(store.getState());
            return returnValue;
        }
    );

    // tslint:disable-next-line:no-shadowed-variable no-any
    const periodAddMiddleware = (store: any) => (
        // tslint:disable-next-line:no-any
        (next: any) => (action: any) => {
            if (action.type === STOP_TIMER_TYPE) {
                const state = store.getState();
                const elapsedTime = now() - state.activityStartTime;
                periodList.addPeriod(state.currentActivity, state.activityStartTime, elapsedTime);
            }

            return next(action);
        }
    );

    const store = createStore(timer, initialState, applyMiddleware(periodAddMiddleware, stateSaveMiddleware));

    const timeTracked: {
        [key: number]: [number, number];
    } = {};

    const today = moment();

    periodList.fetchPeriods((activity, startTime, elapsedTime) => {
        if (!timeTracked[activity.id]) {
            timeTracked[activity.id] = [0, 0];
        }
        // tslint:disable-next-line:no-magic-numbers
        const start = moment(startTime * 1000);
        timeTracked[activity.id][0] += elapsedTime;
        if (today.isSame(start, 'day')) {
            timeTracked[activity.id][1] += elapsedTime;
        }
    }, () => {
        store.dispatch(populateTrackedTime(timeTracked));
    });

    let suspendedId;

    remote.powerMonitor.on('suspend', () => {
        const state = store.getState();
        if (!state.currentActivity) {
            suspendedId = undefined;
            return;
        }

        suspendedId = state.currentActivity.id;
        store.dispatch(stopTimer());
    });

    remote.powerMonitor.on('resume', () => {
        if (!suspendedId) {
            return;
        }
        store.dispatch(startTimer(suspendedId));
    });

    return store;
};