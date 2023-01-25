import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timeout } from 'rxjs'
import { RegistrationModel } from '../wrapper/contentarea/registration/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private client: HttpClient) { }

  registerStudent(data : any){
    return this.client.post<any>("http://localhost:3000/register", data);
  }

  getRegisteredStudentDetails(id : string){
    return this.client.get<any>(`http://localhost:3000/register?id= ${id}`).pipe(
      map(res=>{
        return Object.assign(new RegistrationModel(), res)
    }),
    )
  }

  getAllRegisteredStudentDetails(): any{
    return this.client.get<any>("http://localhost:3000/applicantList").pipe(
      map(res=>{
        return res;
    }),
    )
  }


}
