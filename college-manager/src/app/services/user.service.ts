import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timeout } from 'rxjs'
import { RegistrationModel } from '../wrapper/contentarea/registration/registration.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    userId : String
    registrationId : String
}