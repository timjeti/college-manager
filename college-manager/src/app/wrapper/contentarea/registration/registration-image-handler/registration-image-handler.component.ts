import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-registration-image-handler',
  templateUrl: './registration-image-handler.component.html',
  styleUrls: ['./registration-image-handler.component.css']
})
export class RegistrationImageHandlerComponent {

  constructor(private regService: RegisterService){}

  uploadImage(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    this.regService.uploadImage(formData)
  }

}
