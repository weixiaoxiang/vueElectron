export interface IElectronAPI {
  onOpenAlbum: <T>(data?: T) => any;
  getAlbum: () => any;
}

declare global {
  interface Window {
    electronApi: IElectronAPI;
  }
}
