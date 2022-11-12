const {app, BrowserWindow, screen, ipcMain } = require('electron')
const { desktopCapturer, Size, Notification} = require('electron')
const { Tray, Menu, nativeImage } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow
let tray

function createWindow () {
  let mainScreen = screen.getPrimaryDisplay().size;
  let pathToIcon = path.join(__dirname, `/dist/vision-care-app-ui/favicon.ico`);

  // The main window of the app
  mainWindow = new BrowserWindow({
    width: mainScreen.width,
    height: mainScreen.height,
    icon: pathToIcon,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/vision-care-app-ui/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  mainWindow.webContents.setZoomFactor(mainWindow.webContents.getZoomFactor()*0.9);

  mainWindow.on('closed', (event) => {
    if(app.quitting) mainWindow = null;
  })

  mainWindow.on('close', (event) => {
    //mainWindow = null
    if(!app.quitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  })

  // window.onbeforeunload = (e) => {
  //   let answer = confirm('Do you really want to close the application?');
  //   e.returnValue = answer;  // this will *prevent* the closing no matter what value is passed
  //   if(answer) { win.destroy(); }  // this will close the app
  // };

  // Tray (Notification Area)
  const icon = nativeImage.createFromPath(pathToIcon)
  if(!tray) {
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      { label: "Exit", click: () => { app.quitting = true; app.quit()} }
    ])

    tray.setContextMenu(contextMenu)
    tray.setToolTip('This is a vision care application')
    tray.setTitle('Vision Care')
    tray.on('click', () => {
      // if (mainWindow === null) createWindow();
      // else mainWindow.maximize();
      mainWindow.show();
    });
  }
}

// Set the name of app on the notification
if (process.platform === 'win32')
{
  app.setAppUserModelId("Vision care");
}

app.on('ready', () => {
  createWindow();
  // Notification of the app
  const notification = new Notification(notificationOptions);

  // Ipc handlers between main and renderer
  ipcMain.handle('notifyEvent', async (event, timeLeft, isBreak) => {
    notification.body = `${timeLeft} min left until your ${isBreak ? 'work' : 'break'}`;
    notification.show();
  });

  ScreenshotUtil.startListeningForEvent();
})

app.on('window-all-closed', function () {
  //if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

// Notification options of the app
const notificationOptions = {
  title: 'Reminder notification',
  subtitle: 'Notifying about time left',
  body: 'Body of Custom Notification',
  silent: false,
  icon: path.join(__dirname, `/dist/vision-care-app-ui/favicon.ico`),
  timeoutType: 'default',
  closeButtonText: 'Close Button',
}

class ScreenshotUtil {
  static startListeningForEvent() {
    ipcMain.handle('getScreenshot', async (event, source) => {
      return await this.getScreenSource();
    });
  }

  static async getScreenSource() {
    return await desktopCapturer
      .getSources(
        {
          types: ['screen'],
          thumbnailSize:
            {
              width: 1920,
              height: 1080
            }
        });
  }
}



