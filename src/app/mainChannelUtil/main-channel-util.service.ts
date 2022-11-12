import {ipcRenderer} from 'electron';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainChannelUtilService {
  private ipcRenderer?: typeof ipcRenderer;

  constructor() {
    if(this.isElectron()) {
      this.ipcRenderer = (window).require('electron').ipcRenderer;
    }
  }

  sendEventToMain(channel: string, ...args: any[]) {
    return this.ipcRenderer?.invoke(channel, ...args);
  }

  private isElectron(): boolean {
    return !!((window) && (window).process && (window).process.type);
  }
}
