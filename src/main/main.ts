/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const Database = require('./database');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }

    initDatabaseApi();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Group all database api call

function initDatabaseApi() {
  /*
    Function for check if user exists or not in database.
    call this function at the time of frontend loading
  */

  ipcMain.handle('get-users', async (event, args) => {
    let response = await Database.getUsers();
    return response;
  });

  ipcMain.handle('user-register', async (event, args) => {
    return await Database.userRegister(args);
  });

  ipcMain.handle('check-user-exists', async (event, args) => {
    let response = await Database.checkUserExists(args);
    return response;
  });

  ipcMain.handle('get-profile-info', async (event, args) => {
    let response = await Database.getProfile();
    console.log(response);
  });

  /* Recipe apis call */
  ipcMain.handle('save-recipe', async (event, args) => {
    return await Database.saveRecipe(args);
  });
  
  ipcMain.handle('update-recipe', async (event, args) => {
    return await Database.updateRecipe(args);
  });
  
  ipcMain.handle('get-all-recipe', async (event, args) => {
    return await Database.getAllRecipe(args);
  });

  ipcMain.handle('is-recipe-exists', async (event, args) => {
    return await Database.isRecipeExists(args);
  });
  ipcMain.handle('remove-recipe', async (event, args) => {
    return await Database.removeRecipe(args);
  });

  ipcMain.handle('seed-recipe', async (event, args) => {
    return await Database.seedRecipe(args);
  });
  

  /* Order apis call */
  ipcMain.handle('save-order', async (event, args) => {
    return await Database.saveOrder(args);
  });
  
  ipcMain.handle('update-order', async (event, args) => {
    return await Database.updateOrder(args);
  });
  
  ipcMain.handle('get-all-order', async (event, args) => {
    return await Database.getAllOrder(args);
  });
  
}
app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
