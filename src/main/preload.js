// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electron', {
//   ipcRenderer: {
//     invoke: (channel, ...args) => {
//       const validChannels = ['get-library-path'];
//       if (validChannels.includes(channel)) {
//         return ipcRenderer.invoke(channel, ...args);
//       }
//       return Promise.reject(new Error('Invalid channel'));
//     }
//   }
// });
import { contextBridge } from 'electron';
import * as ffi from 'ffi-napi';

contextBridge.exposeInMainWorld('ffi', {
  Library: ffi.Library
});