import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timeout } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RegistrationreviewService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private client: HttpClient) { }

  addApprovalStatus(data : any){
    return this.client.post<any>("http://localhost:3000/register/status/approval", data);
  }

  updateApprovalStatus(data : any){
    return this.client.put<any>("http://localhost:3000/register/status/approval", data);
  }

  addSelectionStatus(data : any){
    return this.client.post<any>("http://localhost:3000/register/status/selection", data);
  }

  updateSelectionStatus(data : any){
    return this.client.put<any>("http://localhost:3000/register/status/selection", data);
  }

  getJointStudentData(){
    return this.client.get<any>("http://localhost:3000/register/review").pipe(
      map(res=>{
        return res;
    }),
    )
  }


}
