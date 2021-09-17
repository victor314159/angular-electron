import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { actionInfo, actionStatus } from 'gtb-types-module'
import { IpcRenderer } from "electron"

interface PrettyActionInfoIf extends actionInfo {
  prettyStatus: string
}

class PrettyActionInfo implements PrettyActionInfoIf {
  name: string;
  status: actionStatus;
  prettyStatus: string;
  progress: number;
  hint: string;

  constructor(as: actionInfo) {

    this.name = as.name;
    this.status = as.status;

    switch (as.status) {
      case actionStatus.Aborted:
        this.prettyStatus = "Abandonné"
        break;
      case actionStatus.Fail:
        this.prettyStatus = "Echec"
        break;
      case actionStatus.Idle:
        this.prettyStatus = "En attente"
        break;
      case actionStatus.Pass:
        this.prettyStatus = "Succès"
        break;
      case actionStatus.Running:
        this.prettyStatus = "En cours"
        break;

      default:
        break;
    }
    this.progress = as.progress;
    this.hint = as.hint;
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  infoVector: PrettyActionInfo[]
  private ipcRenderer: IpcRenderer;

  constructor(private cd: ChangeDetectorRef) {
    this.ipcRenderer = window.require('electron').ipcRenderer;

    this.ipcRenderer.on("infovector", (event, message: actionInfo[]) => {

      this.infoVector = new Array<PrettyActionInfo>();

      message.forEach((inf: actionInfo) => {
        let info: PrettyActionInfo = new PrettyActionInfo(inf);
        this.infoVector.push(info);
      })
      this.cd.detectChanges();
    })
  }


  ngOnInit(): void {

  }

  displayedColumns = ['numero', 'nomEtape', 'progression', 'etat', 'info'];
}