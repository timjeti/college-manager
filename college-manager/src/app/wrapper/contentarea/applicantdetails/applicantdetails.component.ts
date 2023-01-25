import { Component, ViewChild } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-applicantdetails',
  templateUrl: './applicantdetails.component.html',
  styleUrls: ['./applicantdetails.component.css']
})
export class ApplicantdetailsComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private regService: RegisterService){}

  displayedColumns: string[] = ['id', 'fName', 'mName', 'lName'];

  ngOnInit(){

    this.getApplicantList()
   
    
  }

  dataSource : any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
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


}
