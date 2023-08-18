const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
let win;
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; // 去除控制台警告

const createWindow = () => {
  win = new BrowserWindow({
    x: 600,
    y: 100,
    kiosk: true,
    icon: "/build/icon.ico",
    center: true,
    backgroundColor: "#222222",
    darkTheme: true,
    frame: true, // 是否创建无边框
    fullscreenable: false, // 禁止全屏
    // autoHideMenuBar: true, // 隐藏菜单栏，按alt显示
    alwaysOnTop: false, // 是否置顶
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: true, // 运行preload脚本
      preload: path.join(__dirname, "preload.ts"),
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "相册",
      submenu: [
        {
          click: () => win.webContents.send("update-counter", 1),
          label: "Increment",
        },
        {
          click: () => win.webContents.send("update-counter", -1),
          label: "Decrement",
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  win.loadURL(
    NODE_ENV === "development" ? "http://localhost:5173/" : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  // 渲染进程打开控制台
  if (NODE_ENV === "development") {
    win.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createWindow();
  // 钩子，无法携带参数
  ipcMain.handle("wxx", () => {
    console.log("weixiaoxiang");
  });
  ipcMain.handle("dialog:openFile", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: "测试",
    });

    if (!canceled) {
      return filePaths[0];
    }
  });
  // 回调，可以携带参数
  ipcMain.on("set-title", (event, data) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(data);
  });
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value); // will print value to Node console
  });
});

// 限制只能打开一个页面
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
