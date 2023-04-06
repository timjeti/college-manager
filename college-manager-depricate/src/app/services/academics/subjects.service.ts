import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private client: HttpClient) { }

    //get all subjects based on course type 
    getAllSubjects(): any{
      console.log(`http://localhost:3000/subject/subjects`)
      return this.client.get<any>('http://localhost:3000/subject/subjects').pipe(
        map(res=>{
          return res;
      }),
      )
    }

    //get all subjects based on course type 
    getSubjectsbyCourse(courseName, subjectType): any{
      console.log(`http://localhost:3000/course/${courseName}/subjects?subjectType=${subjectType}`)
      return this.client.get<any>(`http://localhost:3000/course/${courseName}/subjects?subjectType=${subjectType}`).pipe(
        map(res=>{
          return res;
      }),
      )
    }

    createNewSubject(data : any){
      console.log(`http://localhost:3000/subject`)
      return this.client.post<any>(`http://localhost:3000/subject`, data);
    }

    updateSubjectDetails(id:String, data : any){
      console.log(`http://localhost:3000/subject/${id}`)
      return this.client.put<any>(`http://localhost:3000/subject/${id}`, data);
    }
}
