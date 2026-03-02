const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  printPDF: () => ipcRenderer.send("print-pdf"),
});
