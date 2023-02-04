import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import Countries from './util/countries.json'
import States from './util/indian.json'


interface Country{
  name : String,
  code : String
}

interface State{
  state : String,
  districts : String[]
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  aplPerSta : String

  countryList: Country[]
  stateList: State[]

  applicantId = Date.now();
  
  disability: string = 'no';
  disabilityDetails: string = '';
  checked: string = 'no';

  someData : any;
  districts = []



  regForm !: FormGroup;
  constructor(private formbuilder : FormBuilder, private regService: RegisterService){
    this.countryList  = Countries
    console.log(this.countryList)

    this.stateList = States
    console.log(this.stateList)
  }
  
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
      aplPerDist: [ {value  :'', disabled : true} ],
      aplPerPin: [''],

      //Correspondance Address Details
      aplyIsCorAdd: [''],
      aplCorAdd: [''],
      aplCorGuardPhnNum: [''],
      aplCorAddLoc: [''],
      aplPerAddPs: [''],
      aplCorSta: [''],
      aplCorDist: [ {value  :'', disabled : true} ],
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

  //check if dropdown for state is sleceted for either permanent or correspoindent address
  isStateSelected(addressType){
    var state = ''
    if(addressType == 'permanent'){
      state = this.regForm.value.aplPerSta
    }else if (addressType == 'correspondent'){
      state = this.regForm.value.aplCorSta
    }
    if(!state){
      return false
    }
    return true
  }

  getDistrictFromState(event) : any{
    for (let index = 0; index < this.stateList.length; index++) {
      const element = this.stateList[index];
      if(element.state == event){
        console.log(this.regForm.value.aplPerSta)
        this.districts = this.stateList[index].districts
      }
    }
  }

  disableCorrAddr(event){
    if(event.target.checked)
       {  
        console.log("correspondence address disabled");
        this.regForm.controls['aplCorAdd'].disable()
        this.regForm.controls['aplCorGuardPhnNum'].disable()
        this.regForm.controls['aplCorAddLoc'].disable()
        this.regForm.controls['aplPerAddPs'].disable()
        this.regForm.controls['aplCorSta'].disable()
        // this.regForm.controls['aplCorDist'].disable()
        this.regForm.controls['aplCorPin'].disable()  
       }
       else{
        console.log("correspondence address enabled");
        this.regForm.controls['aplCorAdd'].enable()
        this.regForm.controls['aplCorGuardPhnNum'].enable()
        this.regForm.controls['aplCorAddLoc'].enable()
        this.regForm.controls['aplPerAddPs'].enable()
        this.regForm.controls['aplCorSta'].enable()
        // this.regForm.controls['aplCorDist'].enable()
        this.regForm.controls['aplCorPin'].enable()  
       }
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
