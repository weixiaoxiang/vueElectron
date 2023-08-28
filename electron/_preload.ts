// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   wxx: () => ipcRenderer.invoke("wxx"),
//   // 除函数之外，我们也可以暴露变量
// });
// contextBridge.exposeInMainWorld("electronApi", {
//   test: (data) => ipcRenderer.send("set-title", data),
//   openFile: () => ipcRenderer.invoke("dialog:openFile"),
//   onUpdateCounter: (callback) => ipcRenderer.on("update-counter", callback),
//   // 除函数之外，我们也可以暴露变量
// });
