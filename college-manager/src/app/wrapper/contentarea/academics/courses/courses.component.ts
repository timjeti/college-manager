import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RegisterService } from 'src/app/services/register.service';
import {MatDialog} from '@angular/material/dialog';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

export interface courseMap{
  id: number,
  courseId: string,
  courseName: string,
  courseType: string
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['id', 'courseId', 'courseName', 'courseType', 'action'];

  // courses : [{courseId : string, courseName : string}]
  animal: string;
  name: string;

  // constructor(public dialog: MatDialog) {}
  constructor(public dialog: MatDialog, private regService: RegisterService){
    // this.countryList  = Countries
    // console.log(this.countryList)

    // this.stateList = States
    // console.log(this.stateList)
  }

  openDialog() {
    console.log('Inside Dialog')
    this.dialog.open(CourseDialogComponent, {
      width:'70%',
      height:'50%',
      data: {
        id: this.dataSource.id,
        courseId: this.dataSource.courseId,
        courseName:  this.dataSource.courseName,
        courseType: this.dataSource.courseType
      }
    });
  }

  dataSource : any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(){
    this.getAllCourses()
  }


  //Get registration details of a single student
  getAllCourses(){

    this.regService.getAllCourses()
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource = res
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        console.log("Something went wrong")
      }
    })
  }

}