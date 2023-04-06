import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  faLock = faLock;
  forgotPwdForm = new FormGroup({
    email: new FormControl(''),
  });
  constructor(private toast: NgToastService){

  }

  resetPwd() {
    if(this.forgotPwdForm.value.email == "admin@gmail.com")
    {
      this.toast.info({detail: "SUCCESS", summary: "Sent a verification code to the registered email", position: 'tr'})
    }
    else{
      this.toast.error({detail: "ERROR", summary: "Please provide a registered email", position: 'tr'})
    }
  }
}
