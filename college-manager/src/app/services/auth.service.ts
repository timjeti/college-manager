import { map, Observable, of, Subject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgToastService } from 'ng-angular-popup';
import { RegistrationModel } from './model/registration.model';

interface Country{
  name : String,
  code : String
}

interface State{
  state : String,
  districts : String[]
}
interface UploadFileType{
  type: string,
  status: string
}
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // arrCountry: string[] | undefined;
  private arrCountry: Subject<any> = new Subject<any>();
  arrCountry$: Observable<any> = this.arrCountry.asObservable();
/**
 * login user
 */
  private userData: Subject<any> = new Subject<any>();
  userData$: Observable<any> = this.userData.asObservable();

  /**
 * file upload
 */
  private fileUpload: Subject<any> = new Subject<any>();
  fileUpload$: Observable<any> = this.fileUpload.asObservable();
  // private fileUpload: Subject<UploadFileType> = new Subject<UploadFileType>();
  // fileUpload$: Observable<UploadFileType> = this.fileUpload.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private toast: NgToastService
  ) {

    //this.getCountry();
  }

  setUserData(updatedData: any) {
    this.userData.next(updatedData);
  }
  /**
   * 
   * @returns country list from json file
   */
  getCountry(): Observable<any>{
    return this.http
      .get<any>('../../assets/countries.json')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
    /**
   * 
   * @returns states list from json file
   */
    getStatesAndDists(): Observable<any>{
      return this.http
        .get<any>('../../assets/indian.json')
        .pipe(
          map((res) => {
            return res;
          })
        );
    }

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  private options2 = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    }),
  };

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  setRegistrationId(registrationId: string): void {
    localStorage.setItem('candidateRegId', registrationId);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getRegistrationId(): string | null {
    return localStorage.getItem('candidateRegId');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz',);
      return of({ name: 'Samar', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }
  studentRegister(params: any) {
    const candidateRegId = 'REG_' +`${Date.now()}`;
    this.setRegistrationId(candidateRegId)
  }
  // studentRegister(params: any): Observable<any> {
  //   //return this.http.post(`${environment.apiUrl}/studentRegister`, params);
  // }

  registerStudent(registrationId: string, data: any) {
    console.log('from svc' + data);
    return this.http.post<any>(`${environment.apiUrl}/register`, data);
  }

  handleResponse(res: HttpResponse<any>) {
    console.log(JSON.stringify(res));
  }
  async uploadRegistrationBinaries(
    id: string,
    type: string,
    formData: FormData
  ) {
    try {
      console.log(
        `${environment.apiUrl}/register/upload?registrationId=${id}&type=${type}`
      );
      if (type == 'collegeDetails') {
        this.http
          .post<any>(
            `${environment.apiUrl}/register/upload?registrationId=${id}&type=${type}`,
            formData,
            this.options
          )
          .subscribe((res) => {
            this.fileUpload.next({type:`${type}`,status:res.status})
            
            // this.toast.success({
            //   detail: 'Success',
            //   summary: 'File uploaded successfully',
            //   position: 'tr',
            //   duration: 3000,
            // });
            console.log('Image uploaded successfully');
            console.log(res);
          });
      } else {
        this.http
          .post<any>(
            `${environment.apiUrl}/register/upload?registrationId=${id}&type=${type}`,
            formData
          )
          .subscribe((res) => {
            this.fileUpload.next({type:`${type}`,status:res.status})
            // this.toast.success({
            //   detail: 'Success',
            //   summary: 'File uploaded successfully',
            //   position: 'tr',
            //   duration: 3000,
            // });
            console.log('Image uploaded successfully');
            console.log(res);
          });
      }
    } catch (error) {
      this.toast.error({
        detail: 'Error',
        summary: 'Something went wrong',
        position: 'tr',
        duration: 3000,
      });
      console.error(error);
    }
  }

    //get all uploaded data by providing resistration id
    getRegisteredBinaries(id : string, type : String ): Observable<Blob>{
      return this.http.get(`${environment.apiUrl}/register/upload?id=${id}&type=${type}`, { responseType: 'blob' });
    }

  /**
   * get all subjects based on course type
   *
   */
  getSubjectsbyCourse(courseName: any, subjectType: any): any {
    return this.http
      .get<any>(
        `${environment.apiUrl}/course/${courseName}/subjects?subjectType=${subjectType}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   *
   * get all courses
   */
  getAllCourses(): any {
    return this.http.get<any>(`${environment.apiUrl}/course/courses`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * get all courses
   */
  getAllCoursesByType(courseType: any): any {
    return this.http
      .get<any>(`${environment.apiUrl}/course/courses?courseType=${courseType}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  //get all subjects based on course type
  getAllSubjects(): any {
    return this.http.get<any>(`${environment.apiUrl}/subject/subjects`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getRegisteredStudentDetailsFromRegistration(registrationId : string){
    return this.http.get<any>(`${environment.apiUrl}/register?registrationId=${registrationId}`).pipe(
      map(res=>{
        // console.log(res)
        return Object.assign(new RegistrationModel(), res)
    }),
    )
  }

    //get the uploaded details of socuments by providind registration form id
    getUploadDocumentsDetails(registrationId : string){
      return this.http.get<any>(`${environment.apiUrl}/register/upload/details?registrationId=${registrationId}`).pipe(
        map(res=>{
          return res
      }),
      )
    }

}
