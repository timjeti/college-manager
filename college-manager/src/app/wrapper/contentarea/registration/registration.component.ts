import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  
  disability: string = 'no';
  disabilityDetails: string = '';
  checked: string = 'no';
  fName: string = '';
  mName: string = '';
  lName: string = '';
  dBirth: any;
  gender: any;
  

  register(){
    
    console.log("Registered: "+this.fName+' '+this.lName)
    console.log("DOB: "+ this.dBirth)
    console.log("Gender: "+ this.gender)
    // console.log(this.fName)
  }

}
