import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from "electron"
import { actionInfo } from 'gtbmodule'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() {
    this.ipcRenderer = window.require('electron').ipcRenderer;

    this.ipcRenderer.on("infovector", (event, message:actionInfo[]) => {
      console.log("render :");
      message.forEach((inf: actionInfo) => {
        console.log(inf.name);
        console.log(inf.progress);
        console.log(inf.status);
        console.log(inf.hint);
      })
    })
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
