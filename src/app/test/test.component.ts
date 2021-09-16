import { Component, OnInit } from '@angular/core';
import { IpcService } from "./../ipc.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  ipc = new IpcService();
  constructor() { }

  start() {
    console.log("start")
    const asyncFunc = async () => {
      const t = await this.ipc.send<{ kernel: string }>('system-info');
      return t.kernel
    };
    console.log(asyncFunc());
  }

  stop() {
    console.log("stop");
  }

  ngOnInit(): void {
  }

}
