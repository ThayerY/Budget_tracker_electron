// import path from 'path';
// import { fileURLToPath } from 'url';
// import { app, BrowserWindow } from 'electron';
// import { spawn } from 'child_process';


// const nodePath = "C:\\Program Files\\nodejs"; // Your Node.js installation path, no need to include node.exe
// process.env.PATH = `<span class="math-inline">\{nodePath\};</span>{process.env.PATH}`;

// // Reconstruct __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// let mainWindow;
// let backendProcess;

// function createWindow() {
//   // Build absolute path to server.js
//   const serverScript = path.join(__dirname, 'backend', 'server.js');

//   console.log("PATH in Electron:", process.env.PATH);
//   // Spawn the backend with the absolute path
//   backendProcess = spawn('C:\\Program Files\\nodejs\\node.exe', [serverScript], {
//     // The cwd can be your project root so that server.js can find its .env, etc.
//     cwd: __dirname,
//     // shell: true
//   });

//   // Debug logs
//   backendProcess.stdout.on('data', data => {
//     console.log(`Backend: ${data}`);
//   });
//   backendProcess.stderr.on('data', data => {
//     console.error(`Backend Error: ${data}`);
//   });



//   // Create the browser window
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 900,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   });

//   // Load your frontend
//   // Make sure the server listens on port 3000 if it is, do this:
//   mainWindow.loadURL('http://127.0.0.1:3000');

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//     if (backendProcess) {
//       backendProcess.kill();
//     }
//   });
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (mainWindow === null) createWindow();
//   });
// });

// // Quit when all windows are closed
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     if (backendProcess) {
//       backendProcess.kill();
//     }
//     app.quit();
//   }
// });



// ********************************************************************************



// import path from 'path';
// import { fileURLToPath } from 'url';
// import { app, BrowserWindow } from 'electron';
// import { spawn } from 'child_process';

// // Reconstruct __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// let mainWindow;
// let backendProcess;

// function createWindow() {
//   // Build absolute path to server.js
//   const serverScript = path.join(__dirname, 'backend', 'server.js');

//   // Spawn the backend with the absolute path
//   backendProcess = spawn('node', [serverScript], {
//     // The cwd can be your project root so that server.js can find its .env, etc.
//     cwd: __dirname,
//     shell: true
//   });

//   // Debug logs
//   backendProcess.stdout.on('data', data => {
//     console.log(`Backend: ${data}`);
//   });
//   backendProcess.stderr.on('data', data => {
//     console.error(`Backend Error: ${data}`);
//   });

//   // Create the browser window
//   mainWindow = new BrowserWindow({
//     width: 1000,
//     height: 700,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   });

//   // Load your frontend
//   // Make sure your server listens on port 3000 if you do this:
//   mainWindow.loadURL('http://127.0.0.1:3000');

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//     if (backendProcess) {
//       backendProcess.kill();
//     }
//   });
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (mainWindow === null) createWindow();
//   });
// });

// // Quit when all windows are closed
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     if (backendProcess) {
//       backendProcess.kill();
//     }
//     app.quit();
//   }
// });




// electron-main.js
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
  // If you put server.js in /backend, adjust the path accordingly:
  const serverScript = path.join(__dirname, 'backend', 'server.js');

  // Spawn the backend with the absolute path
  // ADD shell: true to avoid "ENOENT" on Windows
  backendProcess = spawn('node', [serverScript], {
    cwd: __dirname,
    shell: true
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
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // In this approach, we assume the backend is serving our frontend at http://127.0.0.1:3000
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
