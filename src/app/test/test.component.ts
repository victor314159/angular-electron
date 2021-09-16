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
    let s: string;
    const asyncFunc = async () => {
      const t = await this.ipc.send<{ kernel: string }>('system-info');
      console.log(t.kernel)
    };

    asyncFunc();
  }

  stop() {
    console.log("stop");
  }

  ngOnInit(): void {
  }

}
