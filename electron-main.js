// electron-main.js

// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// // Keep a global reference of the window object, if you don’t, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let mainWindow;

// function createWindow() {
//   // Create the browser window.
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });

//   // Load your frontend’s index.html file.
//   // Adjust the path to your actual frontend index if needed:
//   mainWindow.loadFile(path.join(__dirname, 'frontend', 'index.html'));

//   // Open DevTools by default (optional):
//   // mainWindow.webContents.openDevTools();

//   mainWindow.on('closed', function () {
//     // Dereference the window object, usually you would store windows in an array
//     // if your app supports multi windows, this is the time when you should
//     // delete the corresponding element.
//     mainWindow = null;
//   });
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', function () {
//   // On macOS it’s common to re-create a window in the app
//   // when the dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });





//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------



// // electron-main.js (ESM Version)

// // Since we’re using ESM and import.meta.url, we need to reconstruct __dirname manually:
// import { app, BrowserWindow } from 'electron';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// // Reconstruct the equivalent of __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Keep a global reference of the window object.
// let mainWindow;

// // Create the browser window.
// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   });

//   // Load your frontend’s index.html (adjust the path as needed).
//   mainWindow.loadFile(join(__dirname, 'frontend', 'index.html'));

//   // Optionally open DevTools (comment out if unwanted):
//   // mainWindow.webContents.openDevTools();

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });
// }

// // Called when Electron has finished initialization.
// app.whenReady().then(createWindow);

// // Quit when all windows are closed (except on macOS).
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   // macOS re-creates a window if the dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });





//--------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


// // electron/electron.js
// import { app, BrowserWindow } from 'electron';
// import { spawn } from 'child_process';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Recreate __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// let mainWindow = null;
// let backendProcess = null;

// // Create a window & spawn the backend
// function createWindow() {
//   // 1) Spawn the backend
//   //    - We run "node backend/server.js"
//   //    - `shell: true` is optional; it sometimes helps on Windows.
//   backendProcess = spawn('node', ['backend/server.js'], {
//     cwd: __dirname, // move up one level if 'backend' is in project root
//     shell: true,
//   });

//   // For debugging/logging:
//   backendProcess.stdout.on('data', data => {
//     console.log(`Backend: ${data}`);
//   });
//   backendProcess.stderr.on('data', data => {
//     console.error(`Backend Error: ${data}`);
//   });

//   // 2) Create the browser window
//   mainWindow = new BrowserWindow({
//     width: 1000,
//     height: 700,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   });

//   // 3) Load your FRONTEND
//   //    Option A) If your frontend is served by live-server or the Node server => load by URL
//   //    mainWindow.loadURL('http://127.0.0.1:8080'); // or 3000, etc.
//   //
//   //    Option B) If your server serves your "frontend" statically => 'http://localhost:3000'
//   //    Option C) Load local index.html => mainWindow.loadFile('some-local-file.html')

//   // Example: If your server is on port 3000:
//   mainWindow.loadURL('http://127.0.0.1:5002');

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//     // Ensure we kill the backend when the window closes:
//     if (backendProcess) {
//       backendProcess.kill();
//     }
//   });
// }

// // This method will be called when Electron has finished initialization
// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     // On macOS, re-create a window when the dock icon is clicked
//     // and there are no other windows open.
//     if (mainWindow === null) createWindow();
//   });
// });

// // Quit when all windows are closed
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     // Also kill the backend if open:
//     if (backendProcess) {
//       backendProcess.kill();
//     }
//     app.quit();
//   }
// });





//--------------------------------------------------------------------------------
//-------------------------------------------------------------------------------




import path from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow } from 'electron';
import { spawn } from 'child_process';

// Reconstruct __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let backendProcess;

function createWindow() {
  // Build absolute path to server.js
  const serverScript = path.join(__dirname, 'backend', 'server.js');

  // Spawn the backend with the absolute path
  backendProcess = spawn('node', [serverScript], {
    // The cwd can be your project root so that server.js can find its .env, etc.
    cwd: __dirname,
    // shell: true
  });

  // Debug logs
  backendProcess.stdout.on('data', data => {
    console.log(`Backend: ${data}`);
  });
  backendProcess.stderr.on('data', data => {
    console.error(`Backend Error: ${data}`);
  });

  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load your frontend
  // Make sure your server listens on port 3000 if you do this:
  mainWindow.loadURL('http://127.0.0.1:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (backendProcess) {
      backendProcess.kill();
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) {
      backendProcess.kill();
    }
    app.quit();
  }
});
