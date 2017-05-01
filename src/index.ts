import * as Electron from 'electron';

// Keep a global ref to the main window or it will be garbage collected
let mainWindow: Electron.BrowserWindow = null;

function createWindow(){
    mainWindow = new Electron.BrowserWindow({
        width: 960,
        height: 540,
        minWidth: 800,
        minHeight: 540,
        show: false,
        icon: 'images/icons/icon24.png',
        frame: false
    });
    //mainWindow.setMenu(null);

    mainWindow.on('close', () => {
        mainWindow = null;
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('maximize');
    });

    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('unmaximize');
    });

    mainWindow.loadURL(`file://${__dirname}/../index.html`)
}

// Call createWindow when the app is ready.
Electron.app.on('ready', () => {
    createWindow();
});

// DO OSX bullshit
Electron.app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        Electron.app.quit();
    }
});

// Activate: open window
Electron.app.on('activate', () => {
    if(mainWindow == null){
        createWindow();
    }
});
