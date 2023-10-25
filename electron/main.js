import { app, BrowserWindow } from "electron";

var mainWindow = null;

app.on("ready", () => {
	mainWindow = createWindow(1024, 768, false);

	// Check if the application is packaged.
	if (!app.isPackaged) {
		// Only enable hot reloading on the main thread if the application is not packaged.
		try { require("electron-reloader")(module, { "watchRenderer": false }); } catch (_) { }

		// You may delete this to stop the app from opening the Dev Tools.
		mainWindow.webContents.openDevTools();
	}
});

function createWindow(w, h, fs) {
	let mw = new BrowserWindow({
		width: w,
		minWidth: w,
		height: h,
		minHeight: h,
		fullscreen: fs,
		frame: true,
		backgroundColor: "#000000",
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		  }
	});

	// How you load the react app depends on if you have a package or not.
	mw.loadURL((!app.isPackaged) ? "http://localhost:3000/index.html" : `file://${__dirname}/../index.html`);

	mw.on("closed", () => {
		app.quit();
	});

	mw.once("ready-to-show", () => {
		mw.show();
	});

	return mw;
}