import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import { EducationTable } from '../Educationtable';

export interface PeriodicElement {
  courseName: string;
  roll: string;
  board: string;
  percentage: string;
  position: string;
  passYear: string;
  // state: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {courseName: 'Metriculation', board: '', roll:'', percentage: '', position: '', passYear: ''},
  {courseName: 'Higher Secondary', board: '', roll:'', percentage: '', position: '', passYear: ''},
  {courseName: 'Graduation', board: '', roll:'', percentage: '', position: '', passYear: ''},
];

@Component({
  selector: 'app-education-table',
  templateUrl: './education-table.component.html',
  styleUrls: ['./education-table.component.css']
})

export class EducationTableComponent implements OnChanges{

  @Output() 
  tableChanged = new EventEmitter<String>();
  @Input()
  expectedProp: { stream: string };

  @Input()
  eduhistory_tableMap = new Map<string, EducationTable>();

  displayedColumns: string[] = ['courseName', 'board', 'roll', 'percentage', 'position','passYear'];
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

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['expectedProp'].previousValue != changes['expectedProp'].currentValue){
      
      // ELEMENT_DATA.push({courseName: 'Metriculation', board: '', roll:'', percentage: '', position: '', passYear: '', state:'float'})
      // ELEMENT_DATA.push({courseName: 'Higher Secondary', board: '', roll:'', percentage: '', position: '', passYear: '', state:'float'})
      // ELEMENT_DATA.push({courseName: 'Graduation', board: '', roll:'', percentage: '', position: '', passYear: '', state:'float'})


      if(changes['expectedProp'].currentValue.stream == "HS"){
        // console.log("Inside HS")
        let temp = ELEMENT_DATA.slice(0,1)
        this.dataSource.setData(temp);
      }else if(changes['expectedProp'].currentValue.stream == "GRADUATION"){
        // console.log("Inside GRAD")
        let temp = ELEMENT_DATA.slice(0,2)
        this.dataSource.setData(temp);
      }else if(changes['expectedProp'].currentValue.stream == "MASTERS"){
        // console.log("Inside MASTERS")
        let temp = ELEMENT_DATA.slice(0,3)
        this.dataSource.setData(temp);
      }

      if(changes['eduhistory_tableMap'] && changes['eduhistory_tableMap'].currentValue.size > 0){
        // console.log("Some edu history changed")
        let table_map = changes['eduhistory_tableMap'].currentValue
        if(table_map.size > 0){
          ELEMENT_DATA.splice(0,3)
        
        
        for (let [key, value] of table_map) {
          // console.log(key, value); 
          // console.log(table_map);
          if(key == "metriculation"){
            // console.log("final metriculation");
            ELEMENT_DATA[0] = {courseName: 'Metriculation', board: value.board, roll:value.roll, percentage: value.percentage, position: value.position, passYear: value.passYear}
            // console.log(ELEMENT_DATA[0])
          }else if(key == "hs"){
            // console.log("final hs");
            ELEMENT_DATA[1] = {courseName: 'Higher Secondary', board: value.board, roll:value.roll, percentage: value.percentage, position: value.position, passYear: value.passYear}
            // console.log(ELEMENT_DATA[1])
          }else if(key == "graduation"){
            // console.log("final master");
            ELEMENT_DATA[2] = {courseName: 'Graduation', board: value.board, roll:value.roll, percentage: value.percentage, position: value.position, passYear: value.passYear}
          }
        }
        this.dataSource.setData(ELEMENT_DATA)
      }
      }
    }



  public onTableChange(element) {
    // console.log("Something changed")
    this.tableChanged.emit(element);
}

  // addData() {
  //   // this.dataToDisplay = [...this.dataToDisplay, {courseName: '', board: '', percentage: '', position: '', passYear: '', state:'float'}];
  //   ELEMENT_DATA.push({courseName: '', board: '', roll:'', percentage: '', position: '', passYear: ''})
  //   console.log(ELEMENT_DATA[ELEMENT_DATA.length-1])
  //   this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[ELEMENT_DATA.length-1]];
  //   console.log(ELEMENT_DATA)
  //   this.dataSource.setData(ELEMENT_DATA);
  // }

  // removeData(index) {
  //   if(index < 2){
  //     alert("Cannot delete the item")
  //   }else{
  //     ELEMENT_DATA.splice(index,1)
  //     // console.log(`length ${ELEMENT_DATA.length}`)
  //     // this.dataToDisplay = this.dataToDisplay.slice(0, -1)
  //     this.dataSource.setData(ELEMENT_DATA);
  //   }
  // }

}

class ExampleDataSource extends DataSource<PeriodicElement> {
  // @Output()
  // onRowAdded = new EventEmitter<any>();

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