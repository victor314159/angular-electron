import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import { Gtb } from 'gtbmodule'
import { actionInfo } from 'gtbmodule'

import { IpcChannelInterface } from './ipc/IpcChannelInterface'
import { SystemInfoChannel } from './ipc/IpcGtbInfoChannel'

class Main {
  private mainWindow: BrowserWindow;
  private gtb: Gtb;

  public init(ipcChannels: IpcChannelInterface[]) {
    // Added 400 ms to fix the black background issue while using transparent window. 
    // More detais at https://github.com/electron/electron/issues/15947

    app.on('ready', () => setTimeout(this.createWindow, 400));
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);

    this.registerIpcChannels(ipcChannels);
    //this.startGtb();
  }

  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)));
  }

  private createWindow() {
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');
    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: (serve) ? true : false,
        contextIsolation: true,  // false if you want to run e2e test with Spectron
        enableRemoteModule: false // true if you want to run e2e test with Spectron or use remote module in renderer context (ie. Angular)
      },
    });

    if (serve) {
      this.mainWindow.webContents.openDevTools();
      require('electron-reload')(__dirname, {
        electron: require(path.join(__dirname, '/../node_modules/electron'))
      });

      this.mainWindow.loadURL('http://localhost:4200');
    } else {
      // Path when running electron executable
      let pathIndex = './index.html';

      if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
        // Path when running electron in local folder
        pathIndex = '../dist/index.html';
      }

      this.mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, pathIndex),
        protocol: 'file:',
        slashes: true
      }));
    }
  }

  private startGtb() {
    this.gtb = new Gtb(
      (infos: actionInfo[]) => {
        infos.forEach((inf: actionInfo) => {
          console.log("New actionInfo : ");
          console.log(inf.name);
          console.log(inf.progress);
          console.log(inf.status);
          console.log(inf.hint);
        })
      },
    );

    this.gtb.LoadScript("../../../../script-quick-start/build/Debug/script-quick-start.dll");

    this.gtb.Start();
  }

  private onWindowAllClosed() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (this.mainWindow === null) {
      this.createWindow();
    }
  }
}

// Here we go!
(new Main()).init([
  new SystemInfoChannel()
]);