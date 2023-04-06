import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService, private route : Router, private toast: NgToastService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    state: RouterStateSnapshot): boolean  {
      if(!this.auth.isLoggedIn()){
        this.toast.error({detail:"ERROR", summary:'Please Login First !', position:'tr'})
        this.route.navigate(['/login'])
        return false;
      }
      return this.auth.isLoggedIn()
    //return true;
  }
  
}
