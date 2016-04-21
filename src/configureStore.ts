import { createStore } from 'redux';
import { remote } from 'electron';
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
    return createStore(function (state, action) {

        switch (action.type) {
            case 'ADD_ACTIVITY':
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