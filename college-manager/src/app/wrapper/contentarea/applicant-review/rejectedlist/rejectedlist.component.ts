import { Component, ViewChild } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { RegistrationreviewService } from 'src/app/services/registrationreview.service';

@Component({
  selector: 'app-rejectedlist',
  templateUrl: './rejectedlist.component.html',
  styleUrls: ['./rejectedlist.component.css']
})
export class RejectedlistComponent {

  initialResponse : any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private regService: RegisterService, private regReview : RegistrationreviewService){}

  displayedColumns: string[] = ['registrationId', 'fName', 'mName', 'lName','selected_msg','update'];

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
    console.log("Inside qpproval service")
    this.regReview.geRejectedData()
    .subscribe({
      next:(res) => {
        this.initialResponse = res
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // return res
    },
    error:()=>{
      console.log("Something went wrong")
    }
  })
  }
    
  updateAdmittedStatus(row){
    console.log(row)
    //prepare data to send to db
    let status  = 1
    let data = {
      "registrationId":row.registrationId,
      "selected_status": status,
      "selected_msg": row.selected_msg
    }
    console.log(data)
    if(status == 1){
      if(row.selected_msg == '' || row.selected_msg == 'undefined'){
        alert("Feedback message should be filled for status accepted")
        return
      }
    }
    // this.getApplicantList()
    //check if user is updating status for first time, if first call post else put

    // if(item.approved_status == undefined){
    console.log("Call POST/UPDATE API")
    this.regReview.addSelectionStatus(data)
    .subscribe({
      next:(res) => {
        this.getApplicantList()
        console.log(res)
      },
      error:(msg)=>{
        console.log(msg)
      }
    })
  }

}

