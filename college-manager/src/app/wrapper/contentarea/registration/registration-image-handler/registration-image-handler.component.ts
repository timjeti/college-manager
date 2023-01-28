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

  isImageLoading = false
  imageToShow: any;
  type : any;
  id :any;
  isPdf = false;
  src = ''
  formData = new FormData();

  loadImage(event) {
    const file = event.target.files[0];
    console.log(file)
    this.formData.append('image', file);
    console.log("Form Data set")
    
  }

  onUpload(){
    console.log(`Sending the call to ui with data ${this.reg_id}, ${this.applicantUploadType}, ${this.formData}`)
    this.regService.uploadRegistrationBinaries(this.reg_id,this.applicantUploadType, this.formData)
  }

  getRegistrationBinaries(id : string, type : any) {
    this.isImageLoading = true;
    (this.regService.getRegisteredBinaries(id, type)).subscribe({
      next:(res) => {
        console.log("Upload data receeived")
      this.createImageFromBlob(res);
      this.isImageLoading = false;
    }, error:(err)=> {
      this.isImageLoading = false;
      console.log(err);
    }
  }); 
}


createImageFromBlob(image: Blob) {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    console.log("file loaded")
    console.log(image.type)
    this.imageToShow = reader.result;
    this.isPdf = false;
    if(image.type == 'application/pdf'){
      this.isPdf = true;
      console.log(this.isPdf)
      // window.open(this.imageToShow, '_blank');
    }
    if(this.imageToShow)
    console.log(this.imageToShow)
  }, false);

  if (image) {
    console.log("Load the image")
    reader.readAsDataURL(image);
  }
}

onSubmit(){
  this.getRegistrationBinaries(this.id, this.type)
}

}
