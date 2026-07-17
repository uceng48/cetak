const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // PENTING: Matikan webSecurity agar operasi canvas (seperti toDataURL) diizinkan 
      // ketika memuat gambar lokal lewat protokol file://
      webSecurity: false 
    }
  });

  // Memuat file HTML utama
  win.loadFile('index.html');

  // Menyembunyikan menu bar bawaan Electron secara default
  // win.setMenu(null); 
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});