import { createStore, applyMiddleware, Store } from 'redux';
import { PeriodStorage } from './PeriodStorage';
import { timer } from './reducers/timer';
import { populateTrackedTime, STOP_TIMER_TYPE, stopTimer, startTimer, PeriodActions } from './actions';
import * as moment from 'moment';
import { now } from './util/now';
const { remote, ipcRenderer } = require('electron');
const fs = remote.require('fs');
const { join } = remote.require('path');
const app = remote.app;

ipcRenderer.send('setNotificationText', '');

const userDataPath = join(app.getPath('appData'), 'TimeTrack');
const uiStateFile = `${userDataPath}/ui.state.json`;
const periodListFile = `${userDataPath}/periods.csv`;
const periodList = new PeriodStorage(periodListFile);

console.log(`User data path: ${userDataPath}`);

// tslint:disable-next-line:no-any
const saveState = (state: any) => {
    // TODO: add locking
    fs.writeFile(uiStateFile, JSON.stringify(state));
};

const loadPeriodsFromLog = (store: Store<{}>) => {
    const timeTracked: {
        [key: number]: [number, number];
    } = {};
    const periodsLogged: {
        [key: number]: Array<[number, number, number]>;
    } = {};

    const today = moment();

    periodList.fetchPeriods((activity, startTime, elapsedTime, periodId) => {
        if (!timeTracked[activity.id]) {
            timeTracked[activity.id] = [0, 0];
            periodsLogged[activity.id] = [];
        }
        periodsLogged[activity.id].push([startTime, elapsedTime, periodId]);
        // tslint:disable-next-line:no-magic-numbers
        const start = moment(startTime * 1000);
        timeTracked[activity.id][0] += elapsedTime;
        if (today.isSame(start, 'day')) {
            timeTracked[activity.id][1] += elapsedTime;
        }
    }, () => {
        store.dispatch(populateTrackedTime(timeTracked, periodsLogged));
    });
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

            if (action.type === PeriodActions.DeletePeriod) {
                periodList.deletePeriod(action.id).then(() => {
                    loadPeriodsFromLog(store);
                }, error => {
                    console.error(error);
                });
            }

            return next(action);
        }
    );

    const store = createStore(timer, initialState, applyMiddleware(periodAddMiddleware, stateSaveMiddleware));
    loadPeriodsFromLog(store);

    let suspendedId: number | undefined;

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