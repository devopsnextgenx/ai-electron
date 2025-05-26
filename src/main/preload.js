const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: (channel, ...args) => {
      const validChannels = ['libb64'];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
      return Promise.reject(new Error('Invalid channel'));
    }
  }
});
// Expose ffi methods
contextBridge.exposeInMainWorld('ffi', {
    Library: (libPath, funcs) => {
        return ffi.Library(libPath, funcs);
    }
});