// frontend/main.js
// Este archivo NO es parte de React. Es el "Main Process" de Electron que envuelve a React.
const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow () {
  // Instanciamos una ventana nativa del sistema operativo
    const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    // THE KIOSK MODE: El requerimiento fundamental del museo.
    // Esto fuerza la pantalla completa absoluta, oculta la barra de tareas de Windows,
    // y evita que el usuario minimice o cierre la ventana accidentalmente.
    kiosk: true, 
    autoHideMenuBar: true,
    webPreferences: {
        // Configuraciones de seguridad para aislar el proceso de renderizado
        nodeIntegration: false,
        contextIsolation: true
    }
    });

    // En entorno de desarrollo, le decimos a Electron que cargue el servidor de Vite (React)
    // En producción, aquí cargarías los archivos estáticos HTML/JS ya compilados.
    mainWindow.loadURL('http://localhost:5173');

    // Solo para tus pruebas en casa: un atajo de teclado para poder salir del modo Kiosco
    // Presiona 'Escape' para salir, porque sin esto, te quedarás atrapada en pantalla completa.
    globalShortcut.register('Escape', () => {
    app.quit();
    });
}

// Ciclo de vida de la aplicación de escritorio
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
    });

    app.on('window-all-closed', function () {
    // En macOS es común que la app siga corriendo, pero en Windows/Linux la matamos.
    if (process.platform !== 'darwin') app.quit();
});