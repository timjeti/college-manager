import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RegisterService } from 'src/app/services/register.service';
import { RegistrationModel } from '../registration/registration.model';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }
//store the lists
let applicantDetails : RegistrationModel[];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-applicantlist',
  styleUrls: ['applicantlist.component.css'],
  templateUrl: 'applicantlist.component.html',
})
export class ApplicantlistComponent {
  displayedColumns: string[] = ['id', 'fName', 'mName', 'lName'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private regService : RegisterService) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
    // console.log(this.getApplicantList())
    
  }
  ngOnInit(){
    this.getApplicantList();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    console.log("Filter data")
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      console.log(this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
    }
  }

  getApplicantList() : any{
    console.log("Inside outer service")
    this.regService.getAllRegisteredStudentDetails()
    .subscribe({
      next:(res) => {
        
        // let table : RegistrationModel[]
        // table = []
        // for (var item of res){
        //   table.push(Object.assign(new RegistrationModel(), item))
        // }

        // // let data = res.map(function(val){
        // //   Object.assign(new RegistrationModel(), val)
        // // })
        console.log(res)
        this.dataSource = res
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(typeof(res[1]));
    },
    error:()=>{
      console.log("Something went wrong")
    }
  })
  }

  // getApplicantList() : any{
  //   console.log("Inside outer service")
  //   this.regService.getAllRegisteredStudentDetails()
  //   .subscribe({
  //     next:(res) => {
  //       console.log(res)
  //       let applicantLists = res.map(function (val){
  //         return Object.assign(new RegistrationModel(), val)
  //       })
  //       // console.log(typeof(res[1]));
  //   },
  //   error:()=>{
  //     console.log("Something went wrong")
  //   }
  // })
  // }

  

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
  
}
