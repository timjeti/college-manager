import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private auth: AuthService, private router: Router, private toast: NgToastService ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }
  //onSubmit(): void 
  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result);
          this.toast.success({detail:"SUCCESS",summary:'Welcome To The Portal', position:'tr'});
          this.router.navigate(['/dashboard']);
        },
        (err: Error) => {
          //alert(err.message);
          this.toast.error({detail:"ERROR",summary:'Invalid Username or Password !', position:'tr'});
        }
      );
    }
  }
}
