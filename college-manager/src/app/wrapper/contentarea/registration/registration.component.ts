import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  applicantId = Date.now();
  
  disability: string = 'no';
  disabilityDetails: string = '';
  checked: string = 'no';

  someData : any;


  regForm !: FormGroup;
  constructor(private formbuilder : FormBuilder, private regService: RegisterService){}
  
  ngOnInit(){
    
    this.regForm = this.formbuilder.group({
      //Student Details
      fName : [''],
      mName : [''],
      lName : [''],
      dBirth : [''],
      gender : [''],

      stdCaste : [''],
      bGroup: [''],
      stdPhnNumber: [''],
      stdEmail: [''],
      religion: [''],
      stdNatlty: [''],
      stdBreak: [''],
      stdGapRsn: [''],
      stdDisability: [''],
      stdDisabilityDet: [''],
      disToColl: [''],


      //Application Details
      aplCourse: [''],
      aplCaste: [''],
      aplHstl: [''],
      aplAdmTyp: [''],
      aplCmpSub: [''],
      aplMilSub: [''],
      aplHnrSub1: [''],
      aplHnrSub2: [''],
      aplHnrSub3: [''],
      aplElecSub: [''],

      //Last Examination Marks
      aplLstExmTotMark: [''],
      aplLstExmMarkObt: [''],
      aplLstExmPcObt: [''],

      //Parent/Guardian's Details
      aplGuardNm: [''],
      aplGuardPhn: [''],
      aplGuardOcp: [''],
      aplGuardInc: [''],
      aplFatNam: [''],
      aplMotNam: [''],
      aplLclGuardNam: [''],
      aplLclGuardAdd: [''],

      //Permanent Address Details

      aplPerAdd: [''],
      aplPerGuardPhnNum: [''],
      aplPerAddLoc: [''],
      aplPerSta: [''],
      aplPerDist: [''],
      aplPerPin: [''],

      //Correspondance Address Details
      aplCorAdd: [''],
      aplCorGuardPhnNum: [''],
      aplCorAddLoc: [''],
      aplPerAddPs: [''],
      aplCorSta: [''],
      aplCorDist: [''],
      aplCorPin: [''],

      //Details of Academic Qualification
      apl12thBoard: [''],
      apl12thYOP: [''],
      apl12thTotMarks: [''],
      apl12thScrdMarks: [''],
      apl12thScrdPc: [''],
      apl12thRoll: [''],
      apl12thRegNum: [''],
      apl12thCol: [''],

      //HS Examination Marks Details
      apl12thSubMil: [''],
      apl12thElecSub1: [''],
      apl12thElecSub2: [''],
      apl12thElecSub3: [''],
      apl12thElecSub4: [''],
      apl12thEngMrk: [''],
      apl12thMilMrk: [''],
      apl12thElec1Mrk: [''],
      apl12thElec2Mrk: [''],
      apl12thElec3Mrk: [''],
      apl12thElec4Mrk: [''],

      //Extra Curricular Activities
      aplExtraCur: [''],

      //Bank Account details
      aplBnkHldrNm: [''],
      aplBnkAcNum: [''],
      aplBnkCnfAcNum: [''],
      aplBnkNam: [''],
      aplBnkBrnch: [''],
      aplBnkIfsc: ['']
    })

    
  }

  register(){
    
    console.log("Registered: ")
    // console.log("DOB: "+ this.dBirth)
    // console.log("Gender: "+ this.gender)
    console.log(this.regForm.value.fName)
    if(this.regForm.valid){
      this.regService.registerStudent(this.regForm.value)
      .subscribe({
        next:(res) =>{
          console.log(res)
        },
        error:()=>{
          console.log("Something went wrong: ${error}")
        }
      })
    }
  }

  getRegistrationDetails(id : string){
    
    this.regService.getRegisteredStudentDetails(id)
    .subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:()=>{
        console.log("Something went wrong")
      }
    })
  }

  // type Employee = Array<{ id: number; name: string }>;

}
