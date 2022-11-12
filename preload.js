const { contextBridge, desktopCapturer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  source: () => desktopCapturer.getSources,
})
