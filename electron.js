const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!app.isPackaged) {
    // Dev mode → load Vite dev server
    mainWindow.loadURL("http://localhost:5173");
  } else {
    // Prod mode → load built files
    mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  }
});

// IPC: Silent print
ipcMain.on("print-pdf", () => {
  if (mainWindow) {
    mainWindow.webContents.print({
      silent: true,
      printBackground: true,
    });
  }
});
