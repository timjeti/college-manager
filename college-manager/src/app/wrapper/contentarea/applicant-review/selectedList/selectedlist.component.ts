import { Component, ViewChild } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { RegistrationreviewService } from 'src/app/services/registrationreview.service';
@Component({
  selector: 'app-selectedlist',
  templateUrl: './selectedlist.component.html',
  styleUrls: ['./selectedlist.component.css']
})
export class SelectedlistComponent {
  initialResponse : any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private regService: RegisterService, private regReview : RegistrationreviewService){}

  displayedColumns: string[] = ['registrationId', 'fName', 'mName', 'lName','selected_msg','update', 'admit'];
  selected_msg = ''

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
    this.regReview.getSelectedNotAdmittedData()
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
    let status  = 0
    let data = {
      "registrationId":row.registrationId,
      "selected_status": status,
      "selected_msg": row.selected_msg
    }
    console.log(data)
    if(status == 1){
      if(row.selected_msg == '' || row.selected_msg == 'undefined'){
        alert("Feedback message should be filled for status rejected")
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
        this.getApplicantList()
      },
      error:(msg)=>{
        console.log(msg)
      }
    })
  }

  openDialogAndAdmit(row){
    console.log("Open dialog and admit if needed")
  }

}
