const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 除函数之外，我们也可以暴露变量
});
contextBridge.exposeInMainWorld("electronApi", {
  getAlbum: () => ipcRenderer.invoke("getAlbum"), // 渲染进程主动请求相册
  onOpenAlbum: (callback) => ipcRenderer.on("openAlbum", callback),
});
