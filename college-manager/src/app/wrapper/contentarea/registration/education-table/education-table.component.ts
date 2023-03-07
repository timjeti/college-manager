import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';

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
  @Input()
  expectedProp: { stream: string };

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['expectedProp'].previousValue != changes['expectedProp'].currentValue){
      
      // ELEMENT_DATA.push({courseName: 'Metriculation', board: '', roll:'', percentage: '', position: '', passYear: '', state:'float'})
      // ELEMENT_DATA.push({courseName: 'Higher Secondary', board: '', roll:'', percentage: '', position: '', passYear: '', state:'float'})
      // ELEMENT_DATA.push({courseName: 'Graduation', board: '', roll:'', percentage: '', position: '', passYear: '', state:'float'})
      
      
      if(changes['expectedProp'].currentValue.stream == "HS"){
          console.log("Inside HS")
          let temp = ELEMENT_DATA.slice(0,1)
          this.dataSource.setData(temp);
      }else if(changes['expectedProp'].currentValue.stream == "GRADUATION"){
          console.log("Inside GRAD")
          let temp = ELEMENT_DATA.slice(0,2)
          this.dataSource.setData(temp);
      }else if(changes['expectedProp'].currentValue.stream == "MASTERS"){
          console.log("Inside MASTERS")
          let temp = ELEMENT_DATA.slice(0,3)
          this.dataSource.setData(temp);
      }
  }




  // private eventsSubscription: Subscription;

  // @Input() events: Observable<void>;

  // ngOnInit(){
  //   this.eventsSubscription = this.events.subscribe(() => this.addData());
  // }

  // ngOnDestroy() {
  //   this.eventsSubscription.unsubscribe();
  // }

  dataSource = new ExampleDataSource(this.dataToDisplay);

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