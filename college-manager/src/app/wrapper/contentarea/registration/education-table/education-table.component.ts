import { Component } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

export interface PeriodicElement {
  courseName: string;
  roll: string;
  board: string;
  percentage: string;
  position: string;
  passYear: string;
  state: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {courseName: 'Metriculation', board: '', roll:'', percentage: '', position: '', passYear: '', state:'fixed'},
  {courseName: 'Higher Secondary', board: '', roll:'', percentage: '', position: '', passYear: '', state:'fixed'},
];

@Component({
  selector: 'app-education-table',
  templateUrl: './education-table.component.html',
  styleUrls: ['./education-table.component.css']
})

export class EducationTableComponent {
  displayedColumns: string[] = ['courseName', 'board', 'roll', 'percentage', 'position','passYear','action'];
  dataToDisplay = [...ELEMENT_DATA];

  selectedYear: number;
  years: number[] = [];

  constructor() {
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 1970; year--) {
      this.years.push(year);
    }
  }

  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    // this.dataToDisplay = [...this.dataToDisplay, {courseName: '', board: '', percentage: '', position: '', passYear: '', state:'float'}];
    ELEMENT_DATA.push({courseName: '', board: '', roll:'', percentage: '', position: '', passYear: '', state:'float'})
    console.log(ELEMENT_DATA[ELEMENT_DATA.length-1])
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[ELEMENT_DATA.length-1]];
    console.log(ELEMENT_DATA)
    this.dataSource.setData(ELEMENT_DATA);
  }

  removeData(index) {
    if(index < 2){
      alert("Cannot delete the item")
    }else{
      ELEMENT_DATA.splice(index,1)
      // console.log(`length ${ELEMENT_DATA.length}`)
      // this.dataToDisplay = this.dataToDisplay.slice(0, -1)
      this.dataSource.setData(ELEMENT_DATA);
    }

    
  }
}

class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}