import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-applicant-docs',
  templateUrl: './applicant-docs.component.html',
  styleUrls: ['./applicant-docs.component.css']
})
export class ApplicantDocsComponent {

  constructor(private regService: RegisterService){}


  isImageLoading = false
  imageToShow: any;
  formData = new FormData();

  type : any;
  registrationId :any;
  isPdf = false;
  src = ''



  //Get the document blob from backend server based on type
  getRegistrationBinaries(registrationId : string, type : any) {
    this.isImageLoading = true;
    (this.regService.getRegisteredBinaries(registrationId, type)).subscribe({
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

//Convert the blob recieved from server to loadable url
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

//This API will return the status of documents, which one got uploaded and which one didnt
getUploadedDocumentDetails(registrationId : string) {
  this.isImageLoading = true;
  (this.regService.getUploadDocumentsDetails(registrationId)).subscribe({
    next:(res) => {
      console.log(res)
  }, error:(err)=> {
    console.log(err);
  }
}); 
}

onSubmit(){
  this.getUploadedDocumentDetails(this.registrationId)
  this.getRegistrationBinaries(this.registrationId, this.type)
}


}
