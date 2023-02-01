import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timeout } from 'rxjs'
import { RegistrationModel } from '../wrapper/contentarea/registration/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

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

  async uploadRegistrationBinaries(id : string, type : string, formData : FormData) {
    console.log("Uploading upload data")
    
    try {
      console.log(`http://localhost:3000/register/upload?id=${id}&type=${type}`)
      if(type == 'collegeDetails'){
        this.client.post<any>(`http://localhost:3000/register/upload?id=${id}&type=${type}`, formData, this.options)
      .subscribe((res)=>{
        console.log('Image uploaded successfully');
        console.log(res);
      })
      }
      else{
        this.client.post<any>(`http://localhost:3000/register/upload?id=${id}&type=${type}`, formData)
        .subscribe((res)=>{
          console.log('Image uploaded successfully');
          console.log(res);
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  getRegisteredBinaries(id : string, type : String ): Observable<Blob>{
    return this.client.get(`http://localhost:3000/register/upload?id=${id}&type=${type}`, { responseType: 'blob' });
  }


}
