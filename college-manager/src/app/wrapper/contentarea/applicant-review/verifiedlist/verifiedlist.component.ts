import { Component, ViewChild } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { RegistrationreviewService } from 'src/app/services/registrationreview.service';

@Component({
  selector: 'app-verifiedlist',
  templateUrl: './verifiedlist.component.html',
  styleUrls: ['./verifiedlist.component.css']
})
export class VerifiedlistComponent {

  initialResponse : any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private regService: RegisterService, private regReview : RegistrationreviewService){}

  displayedColumns: string[] = ['registrationId', 'fName', 'mName', 'lName','selected_msg','selected_status','update', 'revert'];

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
    this.regReview.getVerifiedNotSelectedData()
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
    
  revertBackToRegistration(row){
    console.log(row)
    if(confirm("Are you sure you want to revert back the status to registration")){
          //prepare data to send to db
      let status  = -1
      let data = {
        "registrationId":row.registrationId,
        "verified_status": status,
        // "verified_msg": row.verified_msg
      }
      
      // this.getApplicantList()
      //check if user is updating status for first time, if first call post else put

      // if(item.approved_status == undefined){
      console.log("Call POST/UPDATE API")
      this.regReview.addVerificationStatus(data)
      .subscribe({
        next:(res) => {
          this.getApplicantList()
          console.log(res)
        },
        error:(msg)=>{
          console.log(msg)
        }
      })
      }else{
        return;
      }

  }

  updateSelectedStatus(row){
    console.log(row)
    //prepare data to send to db
    let status  = parseInt(row.selected_status)
    let data = {
      "registrationId":row.registrationId,
      "selected_status": status,
      "selected_msg": row.selected_msg,
    }
    console.log(data)
    if(status !== 1){
      if(row.selected_msg == '' || row.selected_msg == 'undefined'){
       alert("Feedback message should be filled for status pending and rejected")
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
        console.log(res)
      },
      error:(msg)=>{
        console.log(msg)
      }
    })
  }
}

