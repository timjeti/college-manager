import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from '../../components/../../../components/dialog/dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';
interface State {
  state: string;
  districts: string[];
}
interface Education {
  courseName: string;
  board: string;
  roll: string;
  percentage: string;
  position: string;
  passYear: string;
}
@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.scss'],
})
export class CourseRegistrationComponent {
  uploadedDocsInPrint: any = [];
  private registrationId: any;
  isNewRegistration: boolean = true;

  studentEducationQualification: any = [];
  registrationModel: any;
  studentEducations: Education[] = [
    {
      courseName: 'Metriculation',
      board: '',
      roll: '',
      percentage: '',
      position: '',
      passYear: '',
    },
    {
      courseName: 'Higher Secondary',
      board: '',
      roll: '',
      percentage: '',
      position: '',
      passYear: '',
    },
    {
      courseName: 'Graduation',
      board: '',
      roll: '',
      percentage: '',
      position: '',
      passYear: '',
    },
  ];
  fileUrls: any = {
    profile: null,
    signature: null,
    education: null,
    bank: null,
    income: null,
    caste: null,
    disability: null,
  };
  isImageLoading = false;
  imageToShow: any;
  isPdf = false;

  years: number[] = [];
  countryList: any;
  stateList!: State[];
  districts!: string[];

  courses!: [{ courseId: string; courseName: string }];
  electiveList!: [{ subjectName: string }];
  milList!: [{ subjectName: string }];
  honorList!: [{ subjectName: string }];
  compulsorySubList!: [{ subjectName: string }];

  percentDone!: number;
  uploadSuccess!: boolean;
  parentProp = { stream: 'HS' };
  subjectPlaaceHolderText: string = 'Optional paper';
  public isCorDisabled: boolean = false;
  isLinear = false;
  regFormGroup!: FormGroup;
  secondFormGroup: FormGroup | any;

  //registrationId = "test123";
  /**
   * Education history table
   */
  constructor(
    private http: HttpClient,
    private regSvc: AuthService,
    private _formBuilder: FormBuilder,
    private toast: NgToastService,
    public dialog: MatDialog
  ) {
    this.getCountryList();
    this.getStateAndDistList();
    for (let year = new Date().getFullYear(); year >= 1970; year--) {
      this.years.push(year);
    }
    this.registrationId = this.regSvc.getRegistrationId();
    if (this.registrationId) {
      this.getRegistrationDetails();
    }
    // this.regSvc.arrCountry$.subscribe((x)=>{
    //   this.countryList = x;
    // })
    // this.countryList  = Countries
    // this.countryList.forEach(element => {
    //   console.log(element)
    // });
    // //console.log(this.countryList)
    // this.stateList = States
  }
  /**
   * countries list
   */
  getCountryList() {
    this.regSvc.getCountry().subscribe((list: any) => {
      this.countryList = list;
    });
  }
  /**
   * state and district
   */
  getStateAndDistList() {
    this.regSvc.getStatesAndDists().subscribe((list: any) => {
      this.stateList = list as State[];
    });
  }
  getPerDistrictFromState(event: any) {
    console.log(event);
    for (let index = 0; index < this.stateList.length; index++) {
      var element = this.stateList[index];
      if (element.state == event) {
        this.districts = this.stateList[index].districts;
      }
    }
  }

  loadImage(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    const file = event.target.files[0];
    var formData = new FormData();
    //var regId = "REG_2121"
    var imageType = target.id;
    formData.append('image', file);
    this.regSvc
      .uploadRegistrationBinaries(this.registrationId, imageType, formData)
      .then(() => {
        this.regSvc.fileUpload$.subscribe((res) => {
          if (res.status == 201) {
            this.toast.success({
              detail: 'Success',
              summary: 'File type: ' + `${res.type}` + ' uploaded',
              position: 'tr',
              duration: 3000,
            });
            this.getRegistrationBinaries(this.registrationId, imageType);
          }
        });
      });
  }

  //Get the document blob from backend server based on type
  getRegistrationBinaries(registrationId: string, type: string) {
    //this.isImageLoading = true;
    this.regSvc.getRegisteredBinaries(registrationId, type).subscribe({
      next: (res) => {
        // console.log("Upload data receeived")
        this.createImageFromBlob(res, type);
        //this.isImageLoading = false;
      },
      error: (err) => {
        //this.isImageLoading = false;
        console.log(err);
      },
    });
  }

  //Convert the blob recieved from server to loadable url
  //createImageFromBlob(image: Blob, type: string) {
  createImageFromBlob(image: any, type: string) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        console.log('file loaded');
        console.log(image.type);
        //this.imageToShow = reader.result;
        this.fileUrls[type] = reader.result;
        this.isPdf = false;
        if (image.type == 'application/pdf') {
          this.isPdf = true;
          console.log(this.isPdf);
          // window.open(this.imageToShow, '_blank');
        }
        // if(this.imageToShow)
        console.log(image);
      },
      false
    );

    if (image) {
      // console.log("Load the image")
      reader.readAsDataURL(image);
    }
  }

  checkForAdmissionType() {
    this.regFormGroup.value.aplAdmTyp == 'Free'
      ? this.openDialog('Later you have to upload/submit the icome certificate')
      : null;
  }
  openDialog(message: string) {
    this.regFormGroup.controls['aplCaste'].setValue(
      this.regFormGroup.value.stdCaste
    );
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        message: message,
        buttonText: {
          ok: 'Ok',
          cancel: null, //only ok is required
        },
      },
    });
    // const dialogRef = this.dialog.open(AppDialogComponent, {
    //   width: '250px',
    // });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        // run code for confirm
      } else {
        // run code for not confirm
      }
    });
    //this.toast.info({detail:"Information",summary:'Later you have to submit the relevant document', position:'tr', duration:10000})
  }
  convertEducationDetails(educationArray: Education[]) {
    var educationObject: any = {};
    for (let i = 0; i < educationArray.length; i++) {
      let course = educationArray[i];
      educationObject[course.courseName] = {
        board: course.board,
        roll: course.roll,
        percentage: course.percentage,
        position: course.position,
        passYear: course.passYear,
      };
    }
    return educationObject;
  }
  formValidate() {
    let data = {
      userId: this.registrationId,
      registrationId: this.registrationId,
      formData: this.regFormGroup.value,
      tableData: this.convertEducationDetails(this.studentEducations),
    };
    console.log(data);

    //if(this.regFormGroup.valid){
    // if(1==1){
    this.regSvc.registerStudent(this.registrationId, data).subscribe({
      next: (res) => {
        this.isNewRegistration = false;
        console.log('User registered successfully');
      },
      error: () => {
        console.log('Something went wrong: ${error}');
      },
    });
    // }else{
    // this.regService.updateRegistrationDetails(this.registrationId, data)
    // .subscribe({
    //   next:(res) =>{
    //     console.log("User registration updated successfully")
    //   },
    //   error:()=>{
    //     console.log("Something went wrong: ${error}")
    //   }
    // })
    //}
    //}
  }
  /**
   * Student select stream
   */
  selectStream() {
    var stream = this.regFormGroup.value.applStream;

    //alert(this.regFormGroup.value.applStream);
    this.subjectPlaaceHolderText =
      this.regFormGroup.value.applStream == 'HS'
        ? 'Optional paper'
        : 'Elective subject';
    this.getAllCoursesByType(stream.toUpperCase());
  }

  /**
   * To calculate % of all the sibjects
   */
  getPercantage() {
    let totalMarksSecured = 0;
    totalMarksSecured =
      Number.parseInt(this.regFormGroup.value.aplLastEngMrk) +
      Number.parseInt(this.regFormGroup.value.aplLastMilMrk) +
      Number.parseInt(this.regFormGroup.value.aplLastElec1Mrk) +
      Number.parseInt(this.regFormGroup.value.aplLastElec2Mrk) +
      Number.parseInt(this.regFormGroup.value.aplLastElec3Mrk) +
      Number.parseInt(this.regFormGroup.value.aplLastElec4Mrk);
    let perc = (totalMarksSecured / 600) * 100;
    if (0 <= perc && perc <= 100) {
      let val = (Math.round(perc * 10) / 10).toFixed(2);
      this.regFormGroup.controls['aplLstExmPcObt'].setValue(val);
    } else {
      this.regFormGroup.controls['aplLstExmPcObt'].setValue('');
    }
  }
  /**
   * if user toggles between permanent and correspondance address
   */
  fillCorrespondanceAdd() {
    if (this.isCorDisabled == false) {
      this.regFormGroup.controls['aplyIsCorAdd'].setValue(true);

      this.regFormGroup.controls['aplCorAdd'].setValue(
        this.regFormGroup.value.aplPerAdd
      );
      this.regFormGroup.controls['aplCorSta'].setValue(
        this.regFormGroup.value.aplPerSta
      );
      this.regFormGroup.controls['aplCorDist'].setValue(
        this.regFormGroup.value.aplPerDist
      );
      this.regFormGroup.controls['aplCorAddPs'].setValue(
        this.regFormGroup.value.aplPerAddPs
      );
      this.regFormGroup.controls['aplCorGuardPhnNum'].setValue(
        this.regFormGroup.value.aplPerGuardPhnNum
      );
      this.regFormGroup.controls['aplCorAddLoc'].setValue(
        this.regFormGroup.value.aplPerAddLoc
      );
      this.regFormGroup.controls['aplCorPin'].setValue(
        this.regFormGroup.value.aplPerPin
      );
      this.isCorDisabled = true;
    } else if (this.isCorDisabled == true) {
      this.regFormGroup.controls['aplyIsCorAdd'].setValue(false);
      this.regFormGroup.controls['aplCorAdd'].setValue('');
      this.regFormGroup.controls['aplCorSta'].setValue('');
      this.regFormGroup.controls['aplCorDist'].setValue('');
      this.regFormGroup.controls['aplCorAddPs'].setValue('');
      this.regFormGroup.controls['aplCorGuardPhnNum'].setValue('');
      this.regFormGroup.controls['aplCorAddLoc'].setValue('');
      this.regFormGroup.controls['aplCorPin'].setValue('');
      this.isCorDisabled = false;
    }
  }
  //Based on applicant stream selected in registration form get the courses
  getAllCoursesByType(courseType: any) {
    this.parentProp = { stream: courseType };
    this.regSvc.getAllCoursesByType(courseType).subscribe({
      next: (res: any) => {
        console.log(res);
        this.courses = res;
      },
      error: () => {
        console.log('Something went wrong');
      },
    });
  }
  /**
   *
   * once a student selects a course in registration form, only show the subjects that belong to the course
   */
  getSubjectsByCourse(courseName: any) {
    this.getSubjectsByType(courseName, 'elec');
    this.getSubjectsByType(courseName, 'mil');
    this.getSubjectsByType(courseName, 'hon');
    this.getSubjectsByType(courseName, 'comp');
  }
  /**
   * get all the elective subjects for a course
   *
   * */
  getSubjectsByType(event: any, type: string): any {
    this.regSvc.getSubjectsbyCourse(event, type).subscribe({
      next: (res: any) => {
        if (type == 'elec') {
          this.electiveList = res;
        } else if (type == 'mil') {
          this.milList = res;
        } else if (type == 'hon') {
          this.honorList = res;
        } else if (type == 'comp') {
          this.compulsorySubList = res;
        }
      },
      error: () => {
        console.log('Something went wrong');
      },
    });
  }

  ngOnInit() {
    this.regFormGroup = this._formBuilder.group({
      registrationId: [''],
      applStream: ['', Validators.required],
      fName: ['', Validators.required],
      mName: [''],
      lName: [''],
      dBirth: [''],
      stdEmail: [''],
      stdPhnNumber: [''],
      bGroup: [''],
      gender: [''],
      religion: [''],
      stdNatlty: [''],
      stdCaste: [''],
      disToColl: [''],
      stdBreak: [''],
      stdGapRsn: [''],
      stdDisability: [''],
      stdDisabilityDet: [''],
      aplGuardNm: [''],
      aplGuardPhn: [''],
      aplGuardOcp: [''],
      aplGuardInc: [''],

      aplFatNam: [''],
      aplMotNam: [''],
      aplLclGuardNam: [''],
      aplLocGuardPhnNum: [''],
      aplLclGuardAdd: [''],

      //Application Details
      aplCourse: [''],
      aplCaste: [''],
      aplHstl: [''],
      aplAdmTyp: [''],
      aplLastCol: [''],
      //xi and grad below
      aplCmpSub: [''],
      aplMilSub: [''],
      aplElecSub1: [''],
      aplElecSub2: [''],
      aplElecSub3: [''],
      aplElecSub4: [''],
      /**
       * Permanent address field
       */

      aplPerAdd: [''],
      aplPerSta: [''],
      aplPerDist: [''],
      aplPerAddPs: [''],
      aplPerGuardPhnNum: [],
      aplPerAddLoc: [''],
      aplPerPin: [''],
      /**
       * Correspondance address field
       */
      aplyIsCorAdd: [''],
      aplCorAdd: [''],
      aplCorSta: [''],
      aplCorDist: [''],
      aplCorAddPs: [''],
      aplCorGuardPhnNum: [],
      aplCorAddLoc: [''],
      aplCorPin: [''],
      /**
       * Bank Account Details
       */
      aplBnkHldrNm: [''],
      aplBnkAcNum: [''],
      aplBnkCnfAcNum: [''],
      aplBnkNam: [''],
      aplBnkBrnch: [''],
      aplBnkIfsc: [''],

      /**
       * Application detais
       */
      apl12thRegNum: [''],
      aplGradCourseTaken: [''],
      aplGradExmPcObt: [''],

      aplLastEngMrk: [''],
      aplLastMilSub: [''],
      aplLastMilMrk: [''],
      aplLastElecSub1: [''],
      aplLastElecSub2: [''],
      aplLastElecSub3: [''],
      aplLastElecSub4: [''],
      aplLastElec1Mrk: [''],
      aplLastElec2Mrk: [''],
      aplLastElec3Mrk: [''],
      aplLastElec4Mrk: [''],

      aplExtraCur: [''],

      aplLstExmPcObt: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['sam'],
    });
  }

  getRegistrationDetails() {
    //alert("get student data")
    const registrationId = this.registrationId;
    this.regSvc
      .getRegisteredStudentDetailsFromRegistration(registrationId)
      .subscribe({
        next: (res) => {
          if (res.registrationId != undefined || res.registrationId != null) {
            this.isNewRegistration = false; // registration data exist in db
            /**
             * if registration data already exist in the database it'll just populate all the data in the form
             */
            //this.studentEducations = [];
            this.regFormGroup.reset(res);
            this.getPerDistrictFromState(res.aplPerSta);
            this.selectStream();
            this.convertResponseToExams(JSON.parse(res.eduhistory_table));

            this.studentEducations = this.studentEducationQualification.map(
              (edu: any) => ({
                courseName: edu.courseName,
                board: edu.board,
                roll: edu.roll,
                percentage: edu.percentage,
                position: edu.position,
                passYear: edu.passYear,
              })
            );
            console.log(this.studentEducations);
            this.getUplodedDocs();
            //this.getAllCoursesByType(res.aplPerSta);
            // this.regFormGroup.patchValue({
            //   applStream: res.applStream,
            //   fName: res.fName,
            //   mName: res.mName,
            //   lName: res.lName,
            //   dBirth: res.dBirth,
            //   stdEmail: res.stdEmail,
            //   stdPhnNumber: res.stdPhnNumber,
            //   bGroup: res.bGroup,
            //   gender: res.gender,
            //   religion: res.religion,
            //   stdNatlty: res.stdNatlty,
            //   stdCaste: res.stdCaste,
            //   disToColl: res.disToColl,
            //   stdBreak: res.stdBreak,
            //   stdGapRsn: res.stdGapRsn,
            //   stdDisability: res.stdDisability,
            //   stdDisabilityDet: res.stdDisabilityDet,
            //   aplGuardNm: res.aplGuardNm,
            //   aplGuardPhn: res.aplGuardPhn,
            //   aplGuardOcp: res.aplGuardOcp,
            //   aplGuardInc: res.aplGuardInc,
            //   aplFatNam: res.aplFatNam,
            //   aplMotNam: res.aplMotNam,
            //   aplLclGuardNam: res.aplLclGuardNam,
            //   aplLocGuardPhnNum: res.aplLocGuardPhnNum,
            //   aplLclGuardAdd: res.aplLclGuardAdd,

            //   //Application Details
            //   aplCourse: res.aplCourse,
            //   aplCaste: res.aplCaste,
            //   aplHstl: res.aplHstl,
            //   aplAdmTyp: res.aplAdmTyp,
            //   aplLastCol: res.aplLastCol,
            //   //xi and grad below
            //   aplCmpSub: res.aplCmpSub,
            //   aplMilSub: res.aplMilSub,
            //   aplElecSub1: res.aplElecSub1,
            //   aplElecSub2: res.aplElecSub2,
            //   aplElecSub3: res.aplElecSub3,
            //   aplElecSub4: res.aplElecSub4,
            //   /**
            //    * Permanent address field
            //    */
            //   aplPerAdd: res.aplPerAdd,
            //   aplPerSta: res.aplPerSta,
            //   aplPerDist: res.aplPerDist,
            //   aplPerAddPs: res.aplPerAddPs,
            //   aplPerGuardPhnNum: res.aplPerGuardPhnNum,
            //   aplPerAddLoc: res.aplPerAddLoc,
            //   aplPerPin: res.aplPerPin,
            //   /**
            //    * Correspondance address field
            //    */
            //   aplyIsCorAdd: res.aplyIsCorAdd,
            //   aplCorAdd: res.aplCorAdd,
            //   aplCorSta: res.aplCorSta,
            //   aplCorDist: res.aplCorDist,
            //   aplCorAddPs: res.aplCorAddPs,
            //   aplCorGuardPhnNum: res.aplCorGuardPhnNum,
            //   aplCorAddLoc: res.aplCorAddLoc,
            //   aplCorPin: res.aplCorPin,
            //   /**
            //    * Bank Account Details
            //    */
            //   aplBnkHldrNm: res.aplBnkHldrNm,
            //   aplBnkAcNum: res.aplBnkAcNum,
            //   aplBnkCnfAcNum: res.aplBnkCnfAcNum,
            //   aplBnkNam: res.aplBnkNam,
            //   aplBnkBrnch: res.aplBnkBrnch,
            //   aplBnkIfsc: res.aplBnkIfsc,
            //   /**
            //    * Application detais
            //    */
            //   apl12thRegNum: res.apl12thRegNum,
            //   aplGradCourseTaken: res.aplGradCourseTaken,
            //   aplGradExmPcObt: res.aplGradExmPcObt,
            //   aplLastEngMrk: res.aplLastEngMrk,
            //   aplLastMilSub: res.aplLastMilSub,
            //   aplLastMilMrk: res.aplLastMilMrk,
            //   aplLastElecSub1: res.aplLastElecSub1,
            //   aplLastElecSub2: res.aplLastElecSub2,
            //   aplLastElecSub3: res.aplLastElecSub3,
            //   aplLastElecSub4: res.aplLastElecSub4,
            //   aplLastElec1Mrk: res.aplLastElec1Mrk,
            //   aplLastElec2Mrk: res.aplLastElec2Mrk,
            //   aplLastElec3Mrk: res.aplLastElec3Mrk,
            //   aplLastElec4Mrk: res.aplLastElec4Mrk,
            //   aplExtraCur: res.aplExtraCur,
            //   aplLstExmPcObt: res.aplLstExmPcObt,
            // })
          }else{
            console.log("Is Registration type NEW:"+this.isNewRegistration);
          }
          // this.registrationModel = res;
          // this.studentEducationQualification = [];
          // this.convertResponseToExams(JSON.parse(this.registrationModel.eduhistory_table));
        },
        error: () => {
          console.log('Something went wrong');
          // return new RegistrationModel()
        },
      });
  }

  // getUplodedDocs(){
  //   let docsType : any;
  //   this.regSvc.getUploadDocumentsDetails(this.registrationId).subscribe({
  //     next:(res)=>{
  //       //this.registrationModel['uploadDocs'] = this.convertJsonToArray(res)
  //       this.registrationModel['uploadDocs'] = this.convertJsonToArray(res).docsWithName
  //       docsType= this.convertJsonToArray(res).docsType;
  //     },
  //     error:()=>{
  //       console.log("Something went wrong")
  //     }
  //   })

  //   docsType.forEach((x:string)=>{
  //     this.regSvc.getRegisteredBinaries(this.registrationId, x).subscribe({
  //       next:(res) => {
  //         // console.log("Upload data receeived")
  //       this.createImageFromBlob(res,x);
  //       //this.isImageLoading = false;
  //     }, error:(err)=> {
  //       //this.isImageLoading = false;
  //       console.log(err);
  //     }
  //   });
  //   })
  // }

  getUplodedDocs() {
    var docsType: string[] = [];
    this.regSvc
      .getUploadDocumentsDetails(this.registrationId)
      .subscribe((res) => {
        let result = this.convertJsonToArray(res);
        //this.registrationModel['uploadDocs'] = result.docsWithName;
        this.uploadedDocsInPrint = result.docsWithName;
        docsType = result.docsType;
        docsType.forEach((x) => {
          this.regSvc.getRegisteredBinaries(this.registrationId, x).subscribe({
            next: (res) => {
              this.createImageFromBlob(res, x);
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      });
  }

  convertJsonToArray(jsonObj: any): any {
    const docsWithName: string[] = [];
    const docsType: string[] = [];
    for (const [key, value] of Object.entries(jsonObj)) {
      if (value === 1) {
        if (key == 'profile') {
          docsWithName.push('PROFILE-PHOTO');
          docsType.push(key);
        }
        if (key == 'signature') {
          docsWithName.push('SIGNATURE');
          docsType.push(key);
        }
        if (key == 'education') {
          docsWithName.push('EDUCATION-QUALIFICATION');
          docsType.push(key);
        }
        if (key == 'caste') {
          docsWithName.push('CASTE-CERTIFICATE');
          docsType.push(key);
        }
        if (key == 'disability') {
          docsWithName.push('DISABILITY-CERTIFICATE');
          docsType.push(key);
        }
        if (key == 'income') {
          docsWithName.push('INCOME-CERTIFICATE');
          docsType.push(key);
        }
        if (key == 'bank') {
          docsWithName.push('BANK-PASSBOOK');
          docsType.push(key);
        }
      }
    }
    return {
      docsWithName: docsWithName,
      docsType: docsType,
    };
  }
  convertResponseToExams(response: any) {
    for (const exam in response) {
      const examDetails = response[exam];
      const examObject = {
        courseName: exam,
        board: examDetails.board,
        roll: examDetails.roll,
        percentage: examDetails.percentage,
        position: examDetails.position,
        passYear: examDetails.passYear,
      };
      this.studentEducationQualification.push(examObject);
    }
  }
  // convertResponseToExams(response: any) {
  //   console.log(response)
  //   for (const exam in response) {
  //     const examDetails = response[exam];
  //     const examObject = {
  //       courseName: exam,
  //       board: examDetails.board,
  //       roll: examDetails.roll,
  //       percentage: examDetails.percentage,
  //       position: examDetails.position,
  //       passYear: examDetails.passYear
  //     };
  //       this.studentEducationQualification.push(examObject);
  //   }
  //   console.log(this.studentEducationQualification)
  // }

  // convertJsonToArray(jsonObj: any): string[] {
  //   const result: string[] = [];
  //     for (const [key, value] of Object.entries(jsonObj)) {
  //         if (value === 1) {
  //           if(key == 'profile'){ result.push("PROFILE-PHOTO");}
  //           if(key == 'signature'){ result.push("SIGNATURE");}
  //           if(key == 'education'){ result.push("EDUCATION-QUALIFICATION");}
  //           if(key == 'caste'){ result.push("CASTE-CERTIFICATE");}
  //           if(key == 'disability'){ result.push("DISABILITY-CERTIFICATE");}
  //           if(key == 'income'){ result.push("INCOME-CERTIFICATE");}
  //           if(key == 'bank'){ result.push("BANK-PASSBOOK");}
  //           //result.push(key);
  //         }
  //       }
  //     //console.log(result)
  //     return result;
  // }
}
