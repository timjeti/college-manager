import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { RegisterService } from 'src/app/services/register.service';
import Countries from '../../../util/countries.json'
import States from '../../../util/indian.json'
import { Router, NavigationEnd } from '@angular/router';
import { EducationTable } from './Educationtable';
import { RegistrationModel } from './registration.model';
import { CoursesService } from 'src/app/services/academics/courses.service';
import { SubjectsService } from 'src/app/services/academics/subjects.service';


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
  initialFormValueFromDB: RegistrationModel;
  userId="jeevan"
  registrationId : String
  parentProp = { stream: 'HS' }
  isFreshRegistration : Boolean

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
  eduhistory_table : string
  eduhistory_tableMap = new Map<string, EducationTable>();


  regForm !: FormGroup;
  constructor(private formbuilder : FormBuilder, private regService: RegisterService, private router: Router, private courseService: CoursesService, private subService : SubjectsService){
    this.countryList  = Countries
    console.log(this.countryList)

    this.stateList = States
    console.log(this.stateList)
  }
  
  //load the form values from the registration form at runtime
  ngOnInit(){
    //here while calling this api we will have to check if this applicant is fresh application or saved applicant
    // this.registrationId = this.getRegistrationId('fresh')
    this.getRegistrationDetails(this.userId)
    // console.log(this.initialFormValueFromDB)
    // console.log(this.initialFormValueFromDB.registrationId)


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
      aplPerDist: [''],
      aplPerPin: [''],

      //Correspondance Address Details
      aplyIsCorAdd: [''],
      aplCorAdd: [''],
      aplCorGuardPhnNum: [''],
      aplCorAddLoc: [''],
      aplCorAddPs: [''],
      aplCorSta: [''],
      aplCorDist: [''],
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
      aplLstExmPcObt: [''],
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
    this.regForm.controls['aplCorAdd'].disable()
    this.regForm.controls['aplPerDist'].disable()
    this.regForm.controls['aplCorDist'].disable()
    this.regForm.controls['aplyIsCorAdd'].setValue(false)

    
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

  //get the districts for corresponding address given a particular state loaded from state json file
  //also handle the district control once district is fetched
  getCorDistrictFromState(event) : any{
    for (let index = 0; index < this.stateList.length; index++) {
      const element = this.stateList[index];
      if(element.state == event){
        // console.log(this.regForm.value.aplPerSta)
        // console.log(event)
        // console.log(element.state)
        this.districts = this.stateList[index].districts
        this.regForm.controls['aplCorDist'].enable()
        // console.log(this.districts)
      }
    }
  }

  //get the districts for permanent address given a particular state loaded from state json file
  getPerDistrictFromState(event) : any{
    for (let index = 0; index < this.stateList.length; index++) {
      const element = this.stateList[index];
      if(element.state == event){
        // console.log(this.regForm.value.aplPerSta)
        // console.log(event)
        // console.log(element.state)
        this.districts = this.stateList[index].districts
        this.regForm.controls['aplPerDist'].enable()
        // console.log(this.districts)
      }
    }
  }

  //handle corresponding addres checkbox value changes
  //if corressponding address same as permanent address or vice versa, disable or enable the corr address controls
  disableCorrAddr(event){

    if(event.target.checked)
       {  
        console.log("correspondence address disabled");
        this.regForm.controls['aplCorAdd'].disable()
        this.regForm.controls['aplCorAdd'].setValue("")
        this.regForm.controls['aplCorGuardPhnNum'].disable()
        this.regForm.controls['aplCorGuardPhnNum'].setValue("")
        this.regForm.controls['aplCorAddLoc'].disable()
        this.regForm.controls['aplCorAddLoc'].setValue("")
        this.regForm.controls['aplCorAddPs'].disable()
        this.regForm.controls['aplCorAddPs'].setValue("")
        this.regForm.controls['aplCorSta'].disable()
        this.regForm.controls['aplCorSta'].setValue("")
        this.regForm.controls['aplCorDist'].disable()
        this.regForm.controls['aplCorDist'].setValue("")
        this.regForm.controls['aplCorPin'].disable()
        this.regForm.controls['aplCorPin'].setValue("")  
       }
       else{
        console.log("correspondence address enabled");
        this.regForm.controls['aplCorAdd'].enable()
        this.regForm.controls['aplCorGuardPhnNum'].enable()
        this.regForm.controls['aplCorAddLoc'].enable()
        this.regForm.controls['aplCorAddPs'].enable()
        this.regForm.controls['aplCorSta'].enable()
        this.regForm.controls['aplCorDist'].enable()
        this.regForm.controls['aplCorPin'].enable()  
       }
  }

  //Submit registration form of a student
  //this api will be used for both creating a new registration as well as updating a new registration
  register(){
    //handle correspondance address if sanme as permanent address
    if(this.regForm.controls['aplyIsCorAdd'].value){
      this.regForm.controls['aplCorAdd'].enable()
      this.regForm.controls['aplCorAdd'].setValue(this.regForm.controls['aplPerAdd'].value)
      this.regForm.controls['aplCorGuardPhnNum'].enable()
      this.regForm.controls['aplCorGuardPhnNum'].setValue(this.regForm.controls['aplPerGuardPhnNum'].value)
      this.regForm.controls['aplCorAddLoc'].enable()
      this.regForm.controls['aplCorAddLoc'].setValue(this.regForm.controls['aplPerAddLoc'].value)
      this.regForm.controls['aplCorAddPs'].enable()
      this.regForm.controls['aplCorAddPs'].setValue(this.regForm.controls['aplPerAddPs'].value)
      this.regForm.controls['aplCorSta'].enable()
      this.regForm.controls['aplCorSta'].setValue(this.regForm.controls['aplPerSta'].value)
      this.regForm.controls['aplCorDist'].enable()
      this.regForm.controls['aplCorDist'].setValue(this.regForm.controls['aplPerDist'].value)
      this.regForm.controls['aplCorPin'].enable()
      this.regForm.controls['aplCorPin'].setValue(this.regForm.controls['aplPerPin'].value)
    }

    let jsonObject = {};
    this.tableData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    console.log(JSON.stringify(jsonObject));
    let data = {
      "userId" : this.userId,
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
      if(this.isFreshRegistration){
        this.regService.registerStudent(this.registrationId, data)
        .subscribe({
          next:(res) =>{
            console.log("User registered successfully")
          },
          error:()=>{
            console.log("Something went wrong: ${error}")
          }
        })
      }else{
        this.regService.updateRegistrationDetails(data)
        .subscribe({
          next:(res) =>{
            console.log("User registration updated successfully")
          },
          error:()=>{
            console.log("Something went wrong: ${error}")
          }
        })
      }
    }
    // Once the values are stored in db disable controls again for corresponding address
    if(this.regForm.controls['aplyIsCorAdd'].value){
      this.regForm.controls['aplCorAdd'].disable()
      this.regForm.controls['aplCorGuardPhnNum'].disable()
      this.regForm.controls['aplCorAddLoc'].disable()
      this.regForm.controls['aplCorAddPs'].disable()
      this.regForm.controls['aplCorSta'].disable()
      this.regForm.controls['aplCorDist'].disable()
      this.regForm.controls['aplCorPin'].disable()
    }
  }

  //Get registration details of a single student
  //once the value is received from the db, set the values in the registration form  
  getRegistrationDetails(id : string){
    
    this.regService.getRegisteredStudentDetails(id)
    .subscribe({
      next:(res)=>{
        // console.log(res)
        this.initialFormValueFromDB = res
        // console.log(this.initialFormValueFromDB)
        if(this.initialFormValueFromDB.registrationId == undefined){
          this.registrationId = this.getRegistrationId("fresh")
          this.isFreshRegistration = true
          // console.log(this.registrationId)
        }else{
          this.isFreshRegistration = false
          this.registrationId = this.initialFormValueFromDB.registrationId
          this.regForm.controls['applStream'].setValue(this.initialFormValueFromDB.applStream)
          //we have to reload the courses again, otherwise course wont be shown
          this.getAllCoursesByType(this.initialFormValueFromDB.applStream)
          this.parentProp = { stream: this.initialFormValueFromDB.applStream }

          this.regForm.controls['fName'].setValue(this.initialFormValueFromDB.fName)
          this.regForm.controls['mName'].setValue(this.initialFormValueFromDB.mName)
          this.regForm.controls['lName'].setValue(this.initialFormValueFromDB.lName)
          this.regForm.controls['dBirth'].setValue(this.initialFormValueFromDB.dBirth)
          this.regForm.controls['gender'].setValue(this.initialFormValueFromDB.gender)

          this.regForm.controls['stdCaste'].setValue(this.initialFormValueFromDB.stdCaste)
          this.regForm.controls['bGroup'].setValue(this.initialFormValueFromDB.bGroup)
          this.regForm.controls['stdPhnNumber'].setValue(this.initialFormValueFromDB.stdPhnNumber)
          this.regForm.controls['stdEmail'].setValue(this.initialFormValueFromDB.stdEmail)
          this.regForm.controls['religion'].setValue(this.initialFormValueFromDB.religion)
          this.regForm.controls['stdNatlty'].setValue(this.initialFormValueFromDB.stdNatlty)
          this.regForm.controls['stdBreak'].setValue(this.initialFormValueFromDB.stdBreak)
          this.regForm.controls['stdGapRsn'].setValue(this.initialFormValueFromDB.stdGapRsn)
          this.regForm.controls['stdDisability'].setValue(this.initialFormValueFromDB.stdDisability)
          this.regForm.controls['stdDisabilityDet'].setValue(this.initialFormValueFromDB.stdDisabilityDet)
          this.regForm.controls['disToColl'].setValue(this.initialFormValueFromDB.disToColl)

          //Application Details
          this.regForm.controls['aplCourse'].setValue(this.initialFormValueFromDB.aplCourse)
          this.regForm.controls['aplCaste'].setValue(this.initialFormValueFromDB.aplCaste)
          this.regForm.controls['aplHstl'].setValue(this.initialFormValueFromDB.aplHstl)
          this.regForm.controls['aplAdmTyp'].setValue(this.initialFormValueFromDB.aplAdmTyp)
          //xi and grad below
          this.regForm.controls['aplCmpSub'].setValue(this.initialFormValueFromDB.aplCmpSub)
          this.regForm.controls['aplMilSub'].setValue(this.initialFormValueFromDB.aplMilSub)
          this.regForm.controls['aplElecSub1'].setValue(this.initialFormValueFromDB.aplElecSub1)
          this.regForm.controls['aplElecSub2'].setValue(this.initialFormValueFromDB.aplElecSub2)
          this.regForm.controls['aplElecSub3'].setValue(this.initialFormValueFromDB.aplElecSub3)
          this.regForm.controls['aplElecSub4'].setValue(this.initialFormValueFromDB.aplElecSub4)

          //Parent/Guardian's Details
          this.regForm.controls['aplGuardNm'].setValue(this.initialFormValueFromDB.aplGuardNm)
          this.regForm.controls['aplGuardPhn'].setValue(this.initialFormValueFromDB.aplGuardPhn)
          this.regForm.controls['aplGuardOcp'].setValue(this.initialFormValueFromDB.aplGuardOcp)
          this.regForm.controls['aplGuardInc'].setValue(this.initialFormValueFromDB.aplGuardInc)
          this.regForm.controls['aplFatNam'].setValue(this.initialFormValueFromDB.aplFatNam)
          this.regForm.controls['aplMotNam'].setValue(this.initialFormValueFromDB.aplMotNam)
          this.regForm.controls['aplLclGuardNam'].setValue(this.initialFormValueFromDB.aplLclGuardNam)
          this.regForm.controls['aplLclGuardAdd'].setValue(this.initialFormValueFromDB.aplLclGuardAdd)

          //Permanent Address Details

          this.regForm.controls['aplPerAdd'].setValue(this.initialFormValueFromDB.aplPerAdd)
          this.regForm.controls['aplPerGuardPhnNum'].setValue(this.initialFormValueFromDB.aplPerGuardPhnNum)
          this.regForm.controls['aplPerAddLoc'].setValue(this.initialFormValueFromDB.aplPerAddLoc)
          this.regForm.controls['aplPerSta'].setValue(this.initialFormValueFromDB.aplPerSta)
          this.regForm.controls['aplPerAddPs'].setValue(this.initialFormValueFromDB.aplPerAddPs)
          this.regForm.controls['aplPerDist'].setValue(this.initialFormValueFromDB.aplPerDist)
          this.regForm.controls['aplPerPin'].setValue(this.initialFormValueFromDB.aplPerPin)

          //Correspondance Address Details
          this.regForm.controls['aplyIsCorAdd'].setValue(this.initialFormValueFromDB.aplyIsCorAdd)
          this.regForm.controls['aplCorAdd'].setValue(this.initialFormValueFromDB.aplCorAdd)
          this.regForm.controls['aplCorGuardPhnNum'].setValue(this.initialFormValueFromDB.aplCorGuardPhnNum)
          this.regForm.controls['aplCorAddLoc'].setValue(this.initialFormValueFromDB.aplCorAddLoc)
          this.regForm.controls['aplCorAddPs'].setValue(this.initialFormValueFromDB.aplCorAddPs)
          this.regForm.controls['aplCorSta'].setValue(this.initialFormValueFromDB.aplCorSta)
          this.regForm.controls['aplCorDist'].setValue(this.initialFormValueFromDB.aplCorDist)
          this.regForm.controls['aplCorPin'].setValue(this.initialFormValueFromDB.aplCorPin)

          //Details of Academic Qualification
          //grad field
          this.regForm.controls['apl12thRegNum'].setValue(this.initialFormValueFromDB.apl12thRegNum)
          //masters/grad/xi
          this.regForm.controls['aplLastCol'].setValue(this.initialFormValueFromDB.aplLastCol)
          //grad/xi
          this.regForm.controls['aplLstExmPcObt'].setValue(this.initialFormValueFromDB.aplLstExmPcObt)
          //masters below
          this.regForm.controls['aplGradCourseTaken'].setValue(this.initialFormValueFromDB.aplGradCourseTaken)
          this.regForm.controls['aplGradExmPcObt'].setValue(this.initialFormValueFromDB.aplGradExmPcObt)

          //HS & Grad Examination Marks Details
          this.regForm.controls['aplLastMilSub'].setValue(this.initialFormValueFromDB.aplLastMilSub)
          this.regForm.controls['aplLastElecSub1'].setValue(this.initialFormValueFromDB.aplLastElecSub1)
          this.regForm.controls['aplLastElecSub2'].setValue(this.initialFormValueFromDB.aplLastElecSub2)
          this.regForm.controls['aplLastElecSub3'].setValue(this.initialFormValueFromDB.aplLastElecSub3)
          this.regForm.controls['aplLastElecSub4'].setValue(this.initialFormValueFromDB.aplLastElecSub4)
          this.regForm.controls['aplLastEngMrk'].setValue(this.initialFormValueFromDB.aplLastEngMrk)
          this.regForm.controls['aplLastMilMrk'].setValue(this.initialFormValueFromDB.aplLastMilMrk)
          this.regForm.controls['aplLastElec1Mrk'].setValue(this.initialFormValueFromDB.aplLastElec1Mrk)
          this.regForm.controls['aplLastElec2Mrk'].setValue(this.initialFormValueFromDB.aplLastElec2Mrk)
          this.regForm.controls['aplLastElec3Mrk'].setValue(this.initialFormValueFromDB.aplLastElec3Mrk)
          this.regForm.controls['aplLastElec4Mrk'].setValue(this.initialFormValueFromDB.aplLastElec4Mrk)

          //Extra Curricular Activities
          this.regForm.controls['aplExtraCur'].setValue(this.initialFormValueFromDB.aplExtraCur)

          //Bank Account details
          this.regForm.controls['aplBnkHldrNm'].setValue(this.initialFormValueFromDB.aplBnkHldrNm)
          this.regForm.controls['aplBnkAcNum'].setValue(this.initialFormValueFromDB.aplBnkAcNum)
          this.regForm.controls['aplBnkCnfAcNum'].setValue(this.initialFormValueFromDB.aplBnkCnfAcNum)
          this.regForm.controls['aplBnkNam'].setValue(this.initialFormValueFromDB.aplBnkNam)
          this.regForm.controls['aplBnkBrnch'].setValue(this.initialFormValueFromDB.aplBnkBrnch)
          this.regForm.controls['aplBnkIfsc'].setValue(this.initialFormValueFromDB.aplBnkIfsc)
          this.eduhistory_table = this.initialFormValueFromDB.eduhistory_table
          let eduhstry_table = JSON.parse( this.eduhistory_table);
          // console.log(eduhstry_table)
          // console.log(Object.keys(this.eduhistory_table))
          //load the education table
          this.eduhistory_tableMap = new Map<string, EducationTable>();
          for(let key of Object.keys(eduhstry_table)){
            let tablerow = eduhstry_table[key]
            let eTable = new EducationTable(tablerow['board'], tablerow['passYear'], tablerow['percentage'], tablerow['position'],  tablerow['roll'])
            this.eduhistory_tableMap.set(key, eTable)
          }
          // this.eduhistory_table.hs
          // console.log(this.eduhistory_tableMap)
        }
      },
      error:()=>{
        console.log("Something went wrong")
        return new RegistrationModel()
      }
    })
    return new RegistrationModel()
  }
    //once a student selects a course in registration form, only show the subjects that belong to the course
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
      this.subService.getSubjectsbyCourse(event, type)
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

    //Calculate the percentage once the student enters marks in registration form for last examination
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
  //Based on applicant stream selected in registration form get the courses
  getAllCoursesByType(courseType){
    this.parentProp = { stream: courseType }
    console.log(this.parentProp)
    this.courseService.getAllCoursesByType(courseType)
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

  //if user comes to fill up registration form for first time, create a registration id
  //else use from db
  getRegistrationId(status: String){
    if(status == 'fresh'){
      console.log("CREATING FRESH REGISTRATION ID")
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
  //Api to load value in to the map tableData once revcieved from child component
  updateEducationTable(event){
    let eTable = new EducationTable(event.board, event.passYear, event.percentage, event.position,  event.roll)
    if(event.courseName == "Metriculation"){
      this.tableData.set("metriculation", eTable)
    }else if(event.courseName == "Higher Secondary"){
      this.tableData.set("hs", eTable)
    }else if(event.courseName == "Graduation"){
      this.tableData.set("graduation", eTable)
    }
    // console.log(this.tableData)
  }

  //Parse json and return value for a given key
  jsonParser(stringValue, key) {
    var stringVal = JSON.stringify(stringValue);
    var objectValue = JSON.parse(stringVal);
    console.log(objectValue[key])
    return objectValue[key];
   }

}
