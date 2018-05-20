import { join } from 'path';

const DEV_MODE = true;

/* eslint import/no-unresolved: 0 */
const { app/* , Menu*/, Tray, BrowserWindow, ipcMain } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// tslint:disable-next-line:no-any
let mainWindow: any;
// tslint:disable-next-line:no-null-keyword no-any
let tray: any = null;

// tslint:disable-next-line:no-any variable-name
ipcMain.on('setNotificationText', (_event: any, arg: any) => {
    tray.setTitle(arg);
});

// tslint:disable-next-line:only-arrow-functions
function createWindow() {
    tray = new Tray('./icon-menu-play.png');
    tray.setTitle('...');
    /* const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ]);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu); */

    // Create the browser window.
    mainWindow = new BrowserWindow({
        // tslint:disable-next-line:no-magic-numbers
        width: DEV_MODE ? 700 : 300,
        // tslint:disable-next-line:no-magic-numbers
        height: DEV_MODE ? 518 : 118,
    });

    const mainUrl = process.env.MAIN_APP_URL || join('file://', __dirname, '/index.html');

    console.log(`Loading: ${mainUrl}`);

    mainWindow.loadURL(mainUrl);

    if (DEV_MODE) {
        console.log('Enable DevTools');
        mainWindow.webContents.openDevTools({ detach: true });
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools({ detach: true });

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        // tslint:disable-next-line:no-null-keyword
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    app.quit();
    // }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
