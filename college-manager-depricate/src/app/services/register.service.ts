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

  registerStudent(registrationId:String, data : any){
    return this.client.post<any>("http://localhost:3000/register", data);
  }

  updateRegistrationDetails(data : any){
    return this.client.put<any>("http://localhost:3000/register", data);
  }

  getRegisteredStudentDetails(id : string){
    return this.client.get<any>(`http://localhost:3000/register?userId=${id}`).pipe(
      map(res=>{
        // console.log(res)
        return Object.assign(new RegistrationModel(), res)
    }),
    )
  }

  getRegisteredStudentDetailsFromRegistration(registrationId : string){
    return this.client.get<any>(`http://localhost:3000/register?registrationId=${registrationId}`).pipe(
      map(res=>{
        // console.log(res)
        return Object.assign(new RegistrationModel(), res)
    }),
    )
  }

  getAllRegisteredStudentDetails(): any{
    return this.client.get<any>("http://localhost:3000/register/applicantList").pipe(
      map(res=>{
        return res;
    }),
    )
  }

  //upload an image to the server and insert its details in db
  async uploadRegistrationBinaries(id : string, type : string, formData : FormData) {
    console.log("Uploading upload data")
    
    try {
      console.log(`http://localhost:3000/register/upload?registrationId=${id}&type=${type}`)
      if(type == 'collegeDetails'){
        this.client.post<any>(`http://localhost:3000/register/upload?registrationId=${id}&type=${type}`, formData, this.options)
      .subscribe((res)=>{
        console.log('Image uploaded successfully');
        console.log(res);
      })
      }
      else{
        this.client.post<any>(`http://localhost:3000/register/upload?registrationId=${id}&type=${type}`, formData)
        .subscribe((res)=>{
          console.log('Image uploaded successfully');
          console.log(res);
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  //get all uploaded data by providing resistration id
  getRegisteredBinaries(id : string, type : String ): Observable<Blob>{
    return this.client.get(`http://localhost:3000/register/upload?id=${id}&type=${type}`, { responseType: 'blob' });
  }

  //get the uploaded details of socuments by providind registration form id
  getUploadDocumentsDetails(registrationId : string){
    return this.client.get<any>(`http://localhost:3000/register/upload/details?registrationId=${registrationId}`).pipe(
      map(res=>{
        // console.log(res)
        return res
    }),
    )
  }

}
