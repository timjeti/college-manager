import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CoursesService } from 'src/app/services/academics/courses.service';

export interface courseMap{
  id: number,
  courseId: string,
  courseName: string,
  courseType: string
}

export interface DialogData {
  courseId: String,
  courseName:  String,
  courseType: String
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
  constructor(public dialog: MatDialog, private courseService: CoursesService){
    // this.countryList  = Countries
    // console.log(this.countryList)

    // this.stateList = States
    // console.log(this.stateList)
  }

  editDialog(row) {
    // console.log(row)
    console.log('Inside Dialog')
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width:'70%',
      height:'50%',
      data: {
        id: row.id,
        courseId: row.courseId,
        courseName:  row.courseName,
        courseType: row.courseType
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result !== undefined){
        console.log(result)
        this.dataSource.courseId=result.courseId
        this.dataSource.courseName=result.courseName
        this.dataSource.courseType=result.courseType
        this.updateCourseById(result.id, result)
      }
      // console.log(this.data)
    });
  }

  createDialog() {
    // console.log(row)
    console.log('Inside Dialog')
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width:'70%',
      height:'50%',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result !== undefined){
        console.log(result)
        this.dataSource.courseId=result.courseId
        this.dataSource.courseName=result.courseName
        this.dataSource.courseType=result.courseType
        this.createNewCourse(result)
      }
      // console.log(this.data)
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

    this.courseService.getAllCourses()
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

  //Get registration details of a single student
  updateCourseById(id, data){
    this.courseService.updateCourseDetails(id, data)
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.getAllCourses()
        // this.dataSource = new MatTableDataSource(res);
        // // this.dataSource = res
        // console.log(this.dataSource)
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      },
      error:()=>{
        console.log("Something went wrong")
      }
    })
  }

  //Get registration details of a single student
  createNewCourse(data){
    this.courseService.createNewCourse(data)
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.getAllCourses()
        // this.dataSource = new MatTableDataSource(res);
        // // this.dataSource = res
        // console.log(this.dataSource)
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      },
      error:()=>{
        console.log("Something went wrong")
      }
    })
  }

}