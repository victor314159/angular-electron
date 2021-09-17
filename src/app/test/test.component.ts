import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from "electron"

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() {
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  private ipcRenderer: IpcRenderer;

  start() {
    console.log("start")

    this.ipcRenderer.send('start');
  }

  stop() {
    console.log("stop");

    this.ipcRenderer.send('stop');
  }

  ngOnInit(): void {
  }

}
