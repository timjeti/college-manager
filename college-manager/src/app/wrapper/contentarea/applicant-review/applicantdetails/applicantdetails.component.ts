import { Component, ViewChild } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { RegistrationreviewService } from 'src/app/services/registrationreview.service';

@Component({
  selector: 'app-applicantdetails',
  templateUrl: './applicantdetails.component.html',
  styleUrls: ['./applicantdetails.component.css']
})
export class ApplicantdetailsComponent {

  initialResponse : any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private regService: RegisterService, private regReview : RegistrationreviewService){}

  displayedColumns: string[] = ['registrationId', 'fName', 'mName', 'lName','approved_msg','approved_status','update'];

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
    this.regReview.getJointStudentData()
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
    
  updateApprovalStatus(row){
    console.log(row)
    //prepare data to send to db
    let status  = parseInt(row.approved_status)
    let data = {
      "registrationId":row.registrationId,
      "approved_status": status,
      "approved_msg": row.approved_msg
    }
    console.log(data)
    if(status !== 1){
      if(row.approved_msg == '' || row.approved_msg == undefined){
        console.error("Feedback message should be filled for status pending and rejected")
        return
      }
    }
    // this.getApplicantList()
    //check if user is updating status for first time, if first call post else put

    // if(item.approved_status == undefined){
    console.log("Call POST/UPDATE API")
    this.regReview.addApprovalStatus(data)
    .subscribe({
      next:(res) => {
        console.log(res)
      },
      error:(msg)=>{
        console.log(msg)
      }
    })
        // }else{
        //   console.log("Call PUT API")
        //   this.regReview.updateApprovalStatus(data)
        //   .subscribe({
        //     next:(res) => {
        //       console.log(res)
        //     },
        //     error:(msg)=>{
        //       console.log(msg)
        //     }
        //   })
        // }
      
  }

  // onTableChange(row){
    
  //   console.log(row)
  // }


}
