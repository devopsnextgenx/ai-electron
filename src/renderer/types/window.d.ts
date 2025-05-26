declare global {
  interface Window {
    ffi: {
      Library: typeof import('ffi-napi')['Library']
    };
    electron: {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>;
      };
    };
  }
}

export {};