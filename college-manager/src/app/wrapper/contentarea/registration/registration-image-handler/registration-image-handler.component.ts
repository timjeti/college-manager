import { Component, Input } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-registration-image-handler',
  templateUrl: './registration-image-handler.component.html',
  styleUrls: ['./registration-image-handler.component.css']
})
export class RegistrationImageHandlerComponent {

  constructor(private regService: RegisterService){}

  reg_id : string;
  applicantUploadType: string;
  formData = new FormData();


  onUpload(){
    console.log(`Sending the call to ui with data ${this.reg_id}, ${this.applicantUploadType}, ${this.formData}`)
    this.regService.uploadRegistrationBinaries(this.reg_id,this.applicantUploadType, this.formData)
  }

  loadImage(event) {
    const file = event.target.files[0];
    console.log(file)
    this.formData.append('image', file);
    console.log("Form Data set")
  }

}
