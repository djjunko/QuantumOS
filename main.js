const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(`
      body {
        background: url('background1.png') no-repeat center center fixed;
        background-size: cover;
      }
    `);
  });

  // Create menu template
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Reopen App',
          click: () => {
            app.relaunch(); // Relaunch the app
            app.exit(0); // Exit the current instance
          }
        }
      ]
    }
  ];

  // Build menu from template
  const menu = Menu.buildFromTemplate(template);

  // Set menu
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);