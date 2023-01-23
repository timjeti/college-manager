import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private client: HttpClient) { }

  registerStudent(data : any){
    return this.client.post<any>("http://localhost:3000/register", data);
  }

  getRegisteredStudentDetails(id : string){
    return this.client.get<any>(`http://localhost:3000/register?id= ${id}`);
  }
}
