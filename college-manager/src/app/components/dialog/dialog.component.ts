// import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-dialog',
//   templateUrl: './dialog.component.html',
//   //styleUrls: ['./dialog.component.css']
// })
// export class AppDialogComponent {
//   password = '';

//   constructor(public dialogRef: MatDialogRef<AppDialogComponent>) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
   selector: 'app-dialog',
   templateUrl: './dialog.component.html',
//   //styleUrls: ['./dialog.component.css']
})
export class AppDialogComponent {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AppDialogComponent>) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      if(data.buttonText.cancel == null)
      {
        this.cancelButtonText = '';
      }
      else{
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}