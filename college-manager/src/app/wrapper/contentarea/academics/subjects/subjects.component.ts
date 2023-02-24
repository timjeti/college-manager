import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
// SELECT id, subjectId, subjectName, courseName, facultyId, subjectType from coll_subject
  displayedColumns: string[] = ['subjectId', 'subjectName', 'courseName','facultyId','subjectType'];

  // courses : [{courseId : string, courseName : string}]

  dataSource : any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private regService: RegisterService){
    // this.countryList  = Countries
    // console.log(this.countryList)

    // this.stateList = States
    // console.log(this.stateList)
  }

  ngOnInit(){
    this.getSubjects()
  }


  //get all the elective subjects for a course
  getSubjects(): any{
    this.regService.getAllSubjects()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource = res
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // if(type == 'elec'){
        //   this.electiveList = res
        //   // console.log(this.electiveList)
        // }else if(type == 'mil'){
        //   this.milList = res
        // }else if(type == 'hon'){
        //   this.honorList = res
        // }else if(type == 'comp'){
        //   this.compulsorySubList = res
        // }
      },
      error:()=>{
        console.log("Something went wrong")
      }
    })
  }

}

