import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';
import { RegistrationModel } from 'src/app/wrapper/contentarea/registration/registration.model';

@Component({
  selector: 'app-registrationview',
  templateUrl: './registrationview.component.html',
  styleUrls: ['./registrationview.component.css']
})
export class RegistrationviewComponent {

  id = "REG1679260382014"
  registrationModel : RegistrationModel
  fullname
  registrationId
  applStream
  dBirth
  gender
  stdCaste
  bGroup
  stdPhnNumber
  stdEmail
  religion
  stdNatlty
  stdBreak
  stdGapRsn
  stdDisability
  stdDisabilityDet
  disToColl

  //Application Details
  aplCourse
  aplCaste
  aplHstl
  aplAdmTyp
  //xi and grad below
  aplCmpSub
  aplMilSub
  aplElecSub1
  aplElecSub2
  aplElecSub3
  aplElecSub4

  //Parent/Guardian's Details
  aplGuardNm
  aplGuardPhn
  aplGuardOcp
  aplGuardInc
  aplFatNam
  aplMotNam
  aplLclGuardNam
  aplLclGuardAdd

  //Permanent Address Details

  aplPerAdd
  aplPerGuardPhnNum
  aplPerAddLoc
  aplPerSta
  aplPerAddPs
  aplPerDist
  aplPerPin

  //Correspondance Address Details
  aplyIsCorAdd
  aplCorAdd
  aplCorGuardPhnNum
  aplCorAddLoc
  aplCorAddPs
  aplCorSta
  aplCorDist
  aplCorPin

  //Details of Academic Qualification
  //grad field
  apl12thRegNum
  //masters/grad/xi
  aplLastCol
  //grad/xi
  aplLstExmPcObt
  //masters below
  aplGradCourseTaken
  aplGradExmPcObt

  //HS & Grad Examination Marks Details
  aplLastMilSub
  aplLastElecSub1
  aplLastElecSub2
  aplLastElecSub3
  aplLastElecSub4
  aplLastEngMrk
  aplLastMilMrk
  aplLastElec1Mrk
  aplLastElec2Mrk
  aplLastElec3Mrk
  aplLastElec4Mrk

  //Extra Curricular Activities
  aplExtraCur

  //Bank Account details
  aplBnkHldrNm
  aplBnkAcNum
  aplBnkCnfAcNum
  aplBnkNam
  aplBnkBrnch
  aplBnkIfsc

  constructor(private regService: RegisterService){
    this.getRegistrationDetails(this.id)
  }

  initializeTable(){
    this.fullname = this.registrationModel.fName + this.registrationModel.mName + this.registrationModel.lName
    this.registrationId = this.registrationModel.registrationId
    this.applStream=this.registrationModel.applStream
    // this.parentProp = { stream: this.registrationModel.applStream }
    this.dBirth=this.registrationModel.dBirth
    this.gender=this.registrationModel.gender

    //2category
    this.stdCaste=this.registrationModel.stdCaste
    this.bGroup=this.registrationModel.bGroup
    this.stdPhnNumber=this.registrationModel.stdPhnNumber
    this.stdEmail=this.registrationModel.stdEmail
    this.religion=this.registrationModel.religion
    this.stdNatlty=this.registrationModel.stdNatlty
    this.stdBreak=this.registrationModel.stdBreak
    this.stdGapRsn=this.registrationModel.stdGapRsn
    this.stdDisability=this.registrationModel.stdDisability
    this.stdDisabilityDet=this.registrationModel.stdDisabilityDet
    this.disToColl=this.registrationModel.disToColl

    //Application Details
    //1Course
    this.aplCourse=this.registrationModel.aplCourse
    this.aplCaste=this.registrationModel.aplCaste
    this.aplHstl=this.registrationModel.aplHstl
    this.aplAdmTyp=this.registrationModel.aplAdmTyp
    //xi and grad below
    this.aplCmpSub=this.registrationModel.aplCmpSub
    this.aplMilSub=this.registrationModel.aplMilSub
    this.aplElecSub1=this.registrationModel.aplElecSub1
    this.aplElecSub2=this.registrationModel.aplElecSub2
    this.aplElecSub3=this.registrationModel.aplElecSub3
    this.aplElecSub4=this.registrationModel.aplElecSub4

    //Parent/Guardian's Details
    this.aplGuardNm=this.registrationModel.aplGuardNm
    this.aplGuardPhn=this.registrationModel.aplGuardPhn
    this.aplGuardOcp=this.registrationModel.aplGuardOcp
    this.aplGuardInc=this.registrationModel.aplGuardInc
    this.aplFatNam=this.registrationModel.aplFatNam
    this.aplMotNam=this.registrationModel.aplMotNam
    this. aplLclGuardNam=this.registrationModel.aplLclGuardNam
    this.aplLclGuardAdd=this.registrationModel.aplLclGuardAdd

    //Permanent Address Details

    this.aplPerAdd=this.registrationModel.aplPerAdd
    this.aplPerGuardPhnNum=this.registrationModel.aplPerGuardPhnNum
    this.aplPerAddLoc=this.registrationModel.aplPerAddLoc
    this.aplPerSta=this.registrationModel.aplPerSta
    this.aplPerAddPs=this.registrationModel.aplPerAddPs
    this.aplPerDist=this.registrationModel.aplPerDist
    this.aplPerPin=this.registrationModel.aplPerPin

    //Correspondance Address Details
    this.aplyIsCorAdd=this.registrationModel.aplyIsCorAdd
    this.aplCorAdd=this.registrationModel.aplCorAdd
    this.aplCorGuardPhnNum=this.registrationModel.aplCorGuardPhnNum
    this.aplCorAddLoc=this.registrationModel.aplCorAddLoc
    this.aplCorAddPs=this.registrationModel.aplCorAddPs
    this.aplCorSta=this.registrationModel.aplCorSta
    this.aplCorDist=this.registrationModel.aplCorDist
    this.aplCorPin=this.registrationModel.aplCorPin

    //Details of Academic Qualification
    //grad field
    this.apl12thRegNum=this.registrationModel.apl12thRegNum
    //masters/grad/xi
    this.aplLastCol=this.registrationModel.aplLastCol
    //grad/xi
    this.aplLstExmPcObt=this.registrationModel.aplLstExmPcObt
    //masters below
    this.aplGradCourseTaken=this.registrationModel.aplGradCourseTaken
    this.aplGradExmPcObt=this.registrationModel.aplGradExmPcObt

    //HS & Grad Examination Marks Details
    this.aplLastMilSub=this.registrationModel.aplLastMilSub
    this.aplLastElecSub1=this.registrationModel.aplLastElecSub1
    this.aplLastElecSub2=this.registrationModel.aplLastElecSub2
    this.aplLastElecSub3=this.registrationModel.aplLastElecSub3
    this.aplLastElecSub4=this.registrationModel.aplLastElecSub4
    this.aplLastEngMrk=this.registrationModel.aplLastEngMrk
    this.aplLastMilMrk=this.registrationModel.aplLastMilMrk
    this.aplLastElec1Mrk=this.registrationModel.aplLastElec1Mrk
    this.aplLastElec2Mrk=this.registrationModel.aplLastElec2Mrk
    this.aplLastElec3Mrk=this.registrationModel.aplLastElec3Mrk
    this.aplLastElec4Mrk=this.registrationModel.aplLastElec4Mrk

    //Extra Curricular Activities
    this.aplExtraCur=this.registrationModel.aplExtraCur

    //Bank Account details
    this.aplBnkHldrNm=this.registrationModel.aplBnkHldrNm
    this.aplBnkAcNum=this.registrationModel.aplBnkAcNum
    this.aplBnkCnfAcNum=this.registrationModel.aplBnkCnfAcNum
    this.aplBnkNam=this.registrationModel.aplBnkNam
    this.aplBnkBrnch=this.registrationModel.aplBnkBrnch
    this.aplBnkIfsc=this.registrationModel.aplBnkIfsc
  }

  getRegistrationDetails(registrationId : string){
    this.regService.getRegisteredStudentDetailsFromRegistration(registrationId)
    .subscribe({
      next:(res)=>{
        this.registrationModel = res
        this.initializeTable()
        console.log(this.registrationModel)
      },
      error:()=>{
        console.log("Something went wrong")
        // return new RegistrationModel()
      }
    })
  }



  
}
