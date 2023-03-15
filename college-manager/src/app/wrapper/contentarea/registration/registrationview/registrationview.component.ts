import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrationview',
  templateUrl: './registrationview.component.html',
  styleUrls: ['./registrationview.component.css']
})
export class RegistrationviewComponent {

  constructor(private regService: RegisterService, private userService : UserService){
    console.log(userService.registrationId)
    console.log(userService.userId)
  }

  getRegistrationDetails(id : string){
    
    this.regService.getRegisteredStudentDetails(id)
    .subscribe({
      next:(res)=>{
        let initialFormValueFromDB = res
      },
      error:()=>{
        console.log("Something went wrong")
        // return new RegistrationModel()
      }
    })
  }
}
