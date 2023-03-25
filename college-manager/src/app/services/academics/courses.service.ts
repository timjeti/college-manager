import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private client: HttpClient) { }

    //get all courses
    getAllCourses(): any{
      return this.client.get<any>("http://localhost:3000/course/courses").pipe(
        map(res=>{
          return res;
      }),
      )
    }
  
    //get all courses
    getAllCoursesByType(courseType): any{
      return this.client.get<any>(`http://localhost:3000/course/courses?courseType=${courseType}`).pipe(
        map(res=>{
          return res;
      }),
      )
    }

    createNewCourse(data : any){
      console.log(`http://localhost:3000/course`)
      return this.client.post<any>(`http://localhost:3000/course`, data);
    }

    updateCourseDetails(id:String, data : any){
      console.log(`http://localhost:3000/course/${id}`)
      return this.client.put<any>(`http://localhost:3000/course/${id}`, data);
    }
  
}
