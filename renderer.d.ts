export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  test: <T>(data?: T[] | T) => any;
  openFile: <T>(data?: T) => Promise<void>;
  onUpdateCounter: <T>(data?: T) => any;
}
export interface IVersion {
  wxx: () => Promise<void>;
}

declare global {
  interface Window {
    electronApi: IElectronAPI;
    versions: IVersion;
  }
}
