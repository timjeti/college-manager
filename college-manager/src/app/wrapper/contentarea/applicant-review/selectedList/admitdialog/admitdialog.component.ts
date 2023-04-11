import { Component } from '@angular/core';
import { SubjectsService } from 'src/app/services/academics/subjects.service';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-admitdialog',
  templateUrl: './admitdialog.component.html',
  styleUrls: ['./admitdialog.component.css']
})
export class AdmitdialogComponent {

  regService
  subService
  registrationId
  applicantName
  aplCourse
  aplLstExmPcObt
  aplCmpSub
  aplMilSub
  aplMajSub
  aplElecSub1
  aplElecSub2
  aplElecSub3
  aplDHEId
  selectedCompSub

  electiveList : {subjectName : string}[]
  milList : {subjectName : string}[]
  honorList : {subjectName : string}[]
  
  compulsorySubList : {subjectName : string}[]

  constructor(registrationService : RegisterService, subjectService : SubjectsService){

    this.regService = registrationService
    this.subService = subjectService
  }
    //Given a registration id, get the registration form from db
  getRegistrationDetailsById(registrationId : string){
    this.regService.getRegisteredStudentDetailsFromRegistration(registrationId)
    .subscribe({
      next:(res)=>{
        // this.registrationModel = res
        console.log(res)
        this.applicantName = res.fName +" "+ res.mName + " " +res.lName
        if(res.mName == 'undefined' || res.mName == ''){
          this.applicantName = res.fName +" "+res.lName
        }
        
        this.aplCourse=res.aplCourse
        this.aplLstExmPcObt=res.aplLstExmPcObt
        this.aplCmpSub=res.aplCmpSub
        this.aplMilSub=res.aplMilSub
        this.aplMajSub=res.aplElecSub1
        this.aplElecSub1=res.aplElecSub2
        this.aplElecSub2=res.aplElecSub3
        this.aplElecSub3=res.aplElecSub4
        this.getSubjectsByCourse(this.aplCourse)
        // this.initializeTable()
      },
      error:()=>{
        console.log("Something went wrong")
        // return new RegistrationModel()
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
    this.subService.getSubjectsbyCourse(event, type)
    .subscribe({
      next:(res)=>{
        console.log(res)
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

  // removeCompSubjectFromList(event, type){
  //   // console.log(this.compulsorySubList)
  //   console.log(event.target.value)
  //   // console.log(this.electiveList)
  //   if(this.electiveList !== undefined){
  //     let filterList = this.electiveList.filter(
  //       item => item.subjectName !== this.aplCmpSub
  //     ).flat()
  //     // console.log('Showing ....')
  //     // console.log(filterList)
  //     // this.compulsorySubList = filterList
  //     return filterList
  //   }
  //   return [{subjectName:''}]
  // }

  removeCompSubjectFromList(){
    // console.log(this.compulsorySubList)
    // console.log(event.target.value)
    // console.log(this.electiveList)
    if(this.compulsorySubList !== undefined){
      let filterList = this.compulsorySubList.filter(
        item => item.subjectName !== this.aplCmpSub
      ).flat()
      // console.log('Showing ....')
      // console.log(filterList)
      // this.compulsorySubList = filterList
      return filterList
    }
    return [{subjectName:''}]
  }

  changeCompSub(event){
    console.log(event.target.value)
    this.aplCmpSub = event.target.value
  }

  removeMilSubjectFromList(){
    if(this.milList !== undefined){
      let filterList = this.milList.filter(
        item => item.subjectName !== this.aplMilSub
      ).flat()
      // console.log('Showing ....')
      // console.log(filterList)
      // this.compulsorySubList = filterList
      return filterList
    }
    return [{subjectName:''}]
  }

  changeMilSub(event){
    console.log(event.target.value)
    this.aplMilSub = event.target.value
  }

  removeMajSubjectFromList(){
    // console.log(event)
    if(this.honorList !== undefined){
      let filterList = this.honorList.filter(
        item => item.subjectName !== this.aplMajSub
      ).flat()
      return filterList
    }
    return [{subjectName:''}]
  }

  changeMajSub(event){
    console.log(event.target.value)
    this.aplMajSub = event.target.value
  }

  removeElectSubjectFromList(){
    if(this.electiveList !== undefined){
      let filterList = this.electiveList.filter(
        item => item.subjectName !== this.aplElecSub1 && item.subjectName !== this.aplElecSub2 && item.subjectName !== this.aplElecSub3
      ).flat()
      return filterList
    }
    return [{subjectName:''}]
  }

  changeElecSub(event, type){
    console.log(type)
    console.log(event.target.value)
    if(type == 'elec1')
      this.aplElecSub1 = event.target.value
    if(type == 'elec2')
      this.aplElecSub2 = event.target.value
    if(type == 'elec3')
      this.aplElecSub3 = event.target.value
  }

}
