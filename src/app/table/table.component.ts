import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  displayedColumns = ['position', 'name', 'weight', 'symbol', 'info'];

  dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  info: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'Hhhhhhhhhhhhhhhhhhhhhhhhh', info: 'Test' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', info: 'Test' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', info: 'Test' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', info: 'Test' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', info: 'Test' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', info: 'Test' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', info: 'Test' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', info: 'Test' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', info: 'Test' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', info: 'Test' },
];