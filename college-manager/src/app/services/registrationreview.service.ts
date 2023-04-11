import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timeout } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RegistrationreviewService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private client: HttpClient) { }

  addVerificationStatus(data : any){
    return this.client.post<any>("http://localhost:3000/register/status/verification", data);
  }

  addSelectionStatus(data : any){
    return this.client.post<any>("http://localhost:3000/register/status/selection", data);
  }

  getRegisteredNotApprovedData(){
    return this.client.get<any>("http://localhost:3000/register/review/registration").pipe(
      map(res=>{
        return res;
    }),
    )
  }

  getVerifiedNotSelectedData(){
    return this.client.get<any>("http://localhost:3000/register/review/verification").pipe(
      map(res=>{
        return res;
    }),
    )
  }

  getSelectedNotAdmittedData(){
    return this.client.get<any>("http://localhost:3000/register/review/selection").pipe(
      map(res=>{
        return res;
    }),
    )
  }

  geRejectedData(){
    return this.client.get<any>("http://localhost:3000/register/review/rejection").pipe(
      map(res=>{
        return res;
    }),
    )
  }
  //selection

}
