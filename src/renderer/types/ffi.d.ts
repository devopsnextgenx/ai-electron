declare module 'ffi-napi' {
  export function Library(path: string, functions: {
    [key: string]: [string, string[]];
  }): any;
}