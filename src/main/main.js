import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { net } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  import('electron-reload').then(module => {
    const electronReload = module.default;
    electronReload(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      hardResetMethod: 'exit'
    });
  });
}

function waitForDevServer(url, retries = 30) {
  return new Promise((resolve, reject) => {
    const tryConnection = (currentRetry) => {
      const request = net.request(url);
      
      request.on('response', (response) => {
        resolve();
      });

      request.on('error', (error) => {
        if (currentRetry === 0) {
          reject(new Error('Dev server not ready'));
          return;
        }
        setTimeout(() => tryConnection(currentRetry - 1), 1000);
      });

      request.end();
    };

    tryConnection(retries);
  });
}

async function createWindow() {
  if (isDev) {
    try {
      await waitForDevServer('http://localhost:3000');
    } catch (error) {
      console.error('Development server not available:', error);
      app.quit();
      return;
    }
  }

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  try {
    if (isDev) {
      await mainWindow.loadURL('http://localhost:3000');
      mainWindow.webContents.openDevTools();
    } else {
      await mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
    }
  } catch (error) {
    console.error('Failed to load application:', error);
  }
}

const getLibraryPath = () => {
  if (app.isPackaged) {
    // In production, use the resources path
    return path.join(process.resourcesPath, 'resources', 'libb64.so');
    // OR if using public directory:
    // return path.join(__dirname, '..', '..', 'public', 'libb64.so');
  } else {
    // In development
    return path.join(__dirname, '..', '..', 'resources', 'libb64.so');
    // OR if using public directory:
    // return path.join(__dirname, '..', '..', 'public', 'libb64.so');
  }
};

// Make it available to renderer process through IPC
ipcMain.handle('get-library-path', () => {
  return getLibraryPath();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
