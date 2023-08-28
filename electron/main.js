const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const NODE_ENV = process.env.NODE_ENV;
let win;
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; // 去除控制台警告

const createWindow = () => {
  win = new BrowserWindow({
    x: 600,
    y: 100,
    kiosk: true,
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
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // 菜单
  const menu = Menu.buildFromTemplate([
    {
      label: "相册",
      click: () => sendAlbumPathToRenderer(), //win.webContents.send("openAlbum", paths),
      submenu: [
        {
          label: "精修",
          click: () => sendAlbumPathToRenderer("精修"),
        },
        {
          label: "原图",
          click: () => sendAlbumPathToRenderer("原图"),
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  win
    .loadURL(
      NODE_ENV === "development" ? "http://localhost:5173/" : `file://${path.join(__dirname, "../dist/index.html")}`
    )
    .then(() => {
      sendAlbumPathToRenderer();
    });
  // 渲染进程打开控制台
  // if (NODE_ENV === "development") {
  //   win.webContents.openDevTools();
  // }
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  // 渲染进程初次加载获得相册
  ipcMain.handle("getAlbum", async (event, arg) => {
    return sendAlbumPathToRenderer();
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

function sendAlbumPathToRenderer(type = "精修") {
  let paths = []; // 相册所有图片路径
  // const albumPath = path.join(__dirname, `../public/婚纱照/${type}`);
  fs.readdir(`./public/婚纱照/${type}`, async (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    // 遍历文件名列表
    files.forEach((file) => {
      paths.push(path.join(`/public/婚纱照/${type}`, file));
    });
    win.webContents.send("openAlbum", paths);
  });
}
// 阻塞主进程，确保渲染进程已经加载完毕
async function blockTime(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
