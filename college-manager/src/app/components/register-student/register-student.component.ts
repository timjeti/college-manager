import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
})
export class RegisterStudentComponent {
  faLock = faLock;
  studentRegistrationForm = new FormGroup({
    name: new FormControl(''),
    mobileNo: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
  });
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }
  register() {
    let payload = {
      student_name: this.studentRegistrationForm.value.name,
      mobile_no: this.studentRegistrationForm.value.mobileNo,
      email: this.studentRegistrationForm.value.email,
      password: this.studentRegistrationForm.value.confirmpassword,
    };
    this.auth.studentRegister(payload);
   /*when connected to db
    this.auth.studentRegister(payload).subscribe((res) => {
      console.log(res)
      if(res.status == 201)
      {
        this.toast.success({detail:"SUCCESS", summary:"Registration successful"})
      }
    });*/
  }
  
}
