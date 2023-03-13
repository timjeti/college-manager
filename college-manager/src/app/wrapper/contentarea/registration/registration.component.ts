import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { RegisterService } from 'src/app/services/register.service';
import Countries from './util/countries.json'
import States from './util/indian.json'
import { Router, NavigationEnd } from '@angular/router';
import { EducationTable } from './Educationtable';


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

  // eventsStream: Subject<void> = new Subject<void>();
  registrationId : String
  parentProp = { stream: 'HS' }

  aplPerSta : String

  countryList: Country[]
  stateList: State[]
  applicantId: String
  
  
  disability: string = 'no';
  disabilityDetails: string = '';
  studyGap: boolean = false;
  studyGapDetails: string ='';
  checked: string = 'no';

  someData : any;
  districts = []

  courses : [{courseId : string, courseName : string}]
  electiveList : [{subjectName : string}]
  milList : [{subjectName : string}]
  honorList : [{subjectName : string}]
  compulsorySubList : [{subjectName : string}]
  tableData = new Map<string, EducationTable>();


  regForm !: FormGroup;
  constructor(private formbuilder : FormBuilder, private regService: RegisterService, private router: Router){
    this.countryList  = Countries
    console.log(this.countryList)

    this.stateList = States
    console.log(this.stateList)
  }
  
  //load the form values from the registration form at runtime
  ngOnInit(){
    //here while calling this api we will have to check if this applicant is fresh application or saved applicant
    this.registrationId = this.getRegistrationId('fresh')
    this.regForm = this.formbuilder.group({
      applStream : [''],
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
      //xi and grad below
      aplCmpSub: [''],
      aplMilSub: [''],
      aplHnrSub1: [''],
      aplHnrSub2: [''],
      aplHnrSub3: [''],
      aplElecSub: [''],
      //XIth
      aplElecSub1: [''],
      aplElecSub2: [''],
      aplElecSub3: [''],
      aplElecSub4: [''],

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
      aplPerAddPs: [''],
      aplPerDist: [ {value  :'', disabled : true} ],
      aplPerPin: [''],

      //Correspondance Address Details
      aplyIsCorAdd: [''],
      aplCorAdd: [''],
      aplCorGuardPhnNum: [''],
      aplCorAddLoc: [''],
      aplCorAddPs: [''],
      aplCorSta: [''],
      aplCorDist: [ {value  :'', disabled : true} ],
      aplCorPin: [''],

      //Details of Academic Qualification
      // apl12thBoard: [''],
      // apl12thYOP: [''],
      // apl12thTotMarks: [''],
      // apl12thScrdMarks: [''],
      // apl12thScrdPc: [''],
      // apl12thRoll: [''],
      //grad field
      apl12thRegNum: [''],
      //masters/grad/xi
      aplLastCol: [''],
      //grad/xi
      aplLstExmPcObt: [{value  :'', disabled : true}],
      //masters below
      aplGradCourseTaken: [''],
      aplGradExmPcObt: [''],

      //HS & Grad Examination Marks Details
      aplLastMilSub: [''],
      aplLastElecSub1: [''],
      aplLastElecSub2: [''],
      aplLastElecSub3: [''],
      aplLastElecSub4: [''],
      aplLastEngMrk: ['0'],
      aplLastMilMrk: ['0'],
      aplLastElec1Mrk: ['0'],
      aplLastElec2Mrk: ['0'],
      aplLastElec3Mrk: ['0'],
      aplLastElec4Mrk: ['0'],

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
    //Get all the courses
    // this.getAllCourses()
  }

  // studyGapstatus(event){
  //     if(event.target.innerText == "YES"){
  //       this.studyGap = true;
  //     }else{
  //       this.studyGap = false;
  //     }
  // }

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

  //get the districts given a particular state loaded from state json file
  getDistrictFromState(event) : any{
    for (let index = 0; index < this.stateList.length; index++) {
      const element = this.stateList[index];
      if(element.state == event){
        console.log(this.regForm.value.aplPerSta)
        this.districts = this.stateList[index].districts
      }
    }
  }

  //handle corresponding addres checkbox value changes
  disableCorrAddr(event){
    if(event.target.checked)
       {  
        console.log("correspondence address disabled");
        this.regForm.controls['aplCorAdd'].disable()
        this.regForm.controls['aplCorGuardPhnNum'].disable()
        this.regForm.controls['aplCorAddLoc'].disable()
        this.regForm.controls['aplCorAddPs'].disable()
        this.regForm.controls['aplCorSta'].disable()
        // this.regForm.controls['aplCorDist'].disable()
        this.regForm.controls['aplCorPin'].disable()  
       }
       else{
        console.log("correspondence address enabled");
        this.regForm.controls['aplCorAdd'].enable()
        this.regForm.controls['aplCorGuardPhnNum'].enable()
        this.regForm.controls['aplCorAddLoc'].enable()
        this.regForm.controls['aplCorAddPs'].enable()
        this.regForm.controls['aplCorSta'].enable()
        // this.regForm.controls['aplCorDist'].enable()
        this.regForm.controls['aplCorPin'].enable()  
       }
  }

  //Submit registration form of a student
  register(){

    let jsonObject = {};
    this.tableData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    console.log(JSON.stringify(jsonObject));
    let data = {
      "registrationId": this.registrationId,
      "formData":this.regForm.value,
      "tableData" :jsonObject
    }
    console.log("Sending Registration data: ")
    console.log(data)
    // console.log("DOB: "+ this.dBirth)
    // console.log("Gender: "+ this.gender)
    console.log(this.regForm.value.fName)
    if(this.regForm.valid){
      this.regService.registerStudent(this.registrationId, data)
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

  //Get registration details of a single student
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

    //Get registration details of a single student
    getAllCourses(){
    
      this.regService.getAllCourses()
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.courses = res
        },
        error:()=>{
          console.log("Something went wrong")
        }
      })
    }

    getSubjectsByCourse(courseName){
      // console.log(event)
      this.getSubjectsByType(courseName, 'elec')
      this.getSubjectsByType(courseName, 'mil')
      this.getSubjectsByType(courseName, 'hon')
      this.getSubjectsByType(courseName, 'comp')
      // console.log(this.milList)
    }

    //get all the elective subjects for a course
    getSubjectsByType(event, type): any{
      this.regService.getSubjectsbyCourse(event, type)
      .subscribe({
        next:(res)=>{
          if(type == 'elec'){
            this.electiveList = res
            // console.log(this.electiveList)
          }else if(type == 'mil'){
            this.milList = res
          }else if(type == 'hon'){
            this.honorList = res
          }else if(type == 'comp'){
            this.compulsorySubList = res
          }
        },
        error:()=>{
          console.log("Something went wrong")
        }
      })
    }

    getPercantage(){
      console.log("Percentage Block hit")
      let totalMarksSecured = 0
      totalMarksSecured = (Number.parseInt(this.regForm.value.aplLastEngMrk)+Number.parseInt(this.regForm.value.aplLastMilMrk)+Number.parseInt(this.regForm.value.aplLastElec1Mrk)+Number.parseInt(this.regForm.value.aplLastElec2Mrk)+Number.parseInt(this.regForm.value.aplLastElec3Mrk)+Number.parseInt(this.regForm.value.aplLastElec4Mrk))
      console.log(totalMarksSecured)
      let perc = totalMarksSecured / 600 * 100
      if(0 <= perc && perc <= 100){
        let val = (Math.round(perc * 10) / 10).toFixed(2)
        this.regForm.controls['aplLstExmPcObt'].setValue(val)
      }else{
        this.regForm.controls['aplLstExmPcObt'].setValue('')
      }
      
    }

    // enableCGPABlock(){
    //   console.log("CGPA Block hit")
    //   this.regForm.controls['aplLstExmPcObt'].enable()
    //   this.getAllCoursesByType('MASTERS')
    // }

  // type Employee = Array<{ id: number; name: string }>;

      //Get registration details of a single student
  getAllCoursesByType(courseType){
    this.parentProp = { stream: courseType }
    this.regService.getAllCoursesByType(courseType)
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.courses = res
      },
      error:()=>{
        console.log("Something went wrong")
      }
    })
  }

  getRegistrationId(status: String){
    if(status = 'cont'){
      console.log("GET THE REGISTRATION ID FROM DB")
      return "reg1234";
    }else if(status = 'fresh'){
      this.applicantId = `${Date.now()}`;
      this.applicantId = 'REG' + this.applicantId
      console.log(this.applicantId)
      return this.applicantId
    }
    return ""
  }

  // emitStreamEventToChild() {
  //   this.eventsStream.next(this.regForm.value.applStream);
  // }
  //Get the updated values from education table component
  updateEducationTable(event){
    let eTable = new EducationTable(event.board, event.passYear, event.percentage, event.position,  event.roll)
    if(event.courseName == "Metriculation"){
      this.tableData.set("metriculation", eTable)
    }else if(event.courseName == "Higher Secondary"){
      this.tableData.set("hs", eTable)
    }else if(event.courseName == "Graduation"){
      this.tableData.set("graduation", eTable)
    }
    console.log(this.tableData)

  }

}
