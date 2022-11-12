const {app, BrowserWindow, screen, ipcMain } = require('electron')
const { desktopCapturer, Size, Notification} = require('electron')
const { Tray, Menu, nativeImage } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow () {
  let mainScreen = screen.getPrimaryDisplay().size;
  let pathToIcon = path.join(__dirname, `/dist/vision-care-app-ui/favicon.ico`);

  // Tray (Notification Area)
  const icon = nativeImage.createFromPath(pathToIcon)
  let tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])

  tray.setContextMenu(contextMenu)
  tray.setToolTip('This is a vision care application')
  tray.setTitle('Vision Care')
  tray.on('click', () => {
    if (mainWindow === null) createWindow();
    else mainWindow.maximize();
  });



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

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // Notification of the app
  const notification = new Notification(notificationOptions);

  // setInterval(() => {
  //   notification.body = '30 minutes left until your break'
  //   notification.show();
  // }, 10000)

  mainWindow.webContents.send("startDaemon", {});

  // Ipc handlers between main and renderer
  ipcMain.handle('notify', async (event, timeLeft, isBreak) => {
    notification.body = `${timeLeft} left until your ${isBreak ? 'work' : 'break'}`;
    notification.show();
  });

  ScreenshotUtil.startListeningForEvent();




}

// Set the name of app on the notification
if (process.platform === 'win32')
{
  app.setAppUserModelId("Vision care");
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

// Notification options of the app
const notificationOptions = {
  title: 'Interval Notification',
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

