import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { SubjectsService } from 'src/app/services/academics/subjects.service';
import { SubjectDialogComponent } from './subject-dialog/subject-dialog.component';

export interface DialogData {
  id: String,
  subjectId: String,
  subjectName:  String,
  subjectType: String,
  courseName: String,
  facultyId: String 
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
// SELECT id, subjectId, subjectName, courseName, facultyId, subjectType from coll_subject
  displayedColumns: string[] = ['subjectId', 'subjectName', 'courseName','facultyId','subjectType','action'];

  // courses : [{courseId : string, courseName : string}]

  dataSource : any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(public dialog: MatDialog, private subService: SubjectsService){

  }

  editDialog(row) {
    // console.log(row)
    console.log('Inside Dialog')
    const dialogRef = this.dialog.open(SubjectDialogComponent, {
      width:'70%',
      height:'50%',
      data: {
        id: row.id,
        subjectId: row.subjectId,
        subjectName: row.subjectName,
        subjectType: row.subjectType,
        courseName: row.courseName,
        facultyId: row.facultyId,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result !== undefined){
        console.log(result)
        this.updateSubjectById(result.id, result)
      }
      // console.log(this.data)
    });
  }

  createDialog() {
    // console.log(row)
    console.log('Inside Dialog')
    const dialogRef = this.dialog.open(SubjectDialogComponent, {
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
        this.createNewSubject(result)
      }
      // console.log(this.data)
    });
  }

  ngOnInit(){
    this.getSubjects()
  }

  //get all the elective subjects for a course
  getSubjects(): any{
    this.subService.getAllSubjects()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource = res
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        console.log("Something went wrong")
      }
    })
  }

    //Get registration details of a single student
    updateSubjectById(id, data){
      this.subService.updateSubjectDetails(id, data)
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.getSubjects()
        },
        error:()=>{
          console.log("Something went wrong")
        }
      })
    }

    createNewSubject(data){
      this.subService.createNewSubject(data)
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.getSubjects()
        },
        error:()=>{
          console.log("Something went wrong")
        }
      })
    }

}

