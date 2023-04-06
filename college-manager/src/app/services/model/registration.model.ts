export class RegistrationModel{

     // id?: any;
     userId?: string;
     registrationId?: string;
     applStream?: string;
     fName?: string;
     mName?: string;
     lName?: string;


     dBirth ?: string;
     gender ?: string;

     stdCaste ?: string;
     bGroup?: string;
     stdPhnNumber?: string;
     stdEmail?: string;
     religion?: string;
     stdNatlty?: string;
     stdBreak?: string;
     stdGapRsn?: string;
     stdDisability?: string;
     stdDisabilityDet?: string;
     disToColl?: string;


     //Application Details
     aplCourse?: string;
     aplCaste?: string;
     aplHstl?: string;
     aplAdmTyp?: string;
     //xi and grad below
     aplCmpSub?: string;
     aplMilSub?: string;
     aplElecSub1?: string;
     aplElecSub2?: string;
     aplElecSub3?: string;
     aplElecSub4?: string;

     //Parent/Guardian's Details
     aplGuardNm?: string;
     aplGuardPhn?: string;
     aplGuardOcp?: string;
     aplGuardInc?: string;
     aplFatNam?: string;
     aplMotNam?: string;
     aplLclGuardNam?: string;
     aplLclGuardAdd?: string;

     //Permanent Address Details

     aplPerAdd?: string;
     aplPerGuardPhnNum?: string;
     aplPerAddLoc?: string;
     aplPerSta?: string;
     aplPerAddPs?: string;
     aplPerDist?: string;
     aplPerPin?: string;

     //Correspondance Address Details
     aplyIsCorAdd?: string;
     aplCorAdd?: string;
     aplCorGuardPhnNum?: string;
     aplCorAddLoc?: string;
     aplCorAddPs?: string;
     aplCorSta?: string;
     aplCorDist?:string;
     aplCorPin?: string;

     //Details of Academic Qualification
     //grad field
     apl12thRegNum?: string;
     //masters/grad/xi
     aplLastCol?: string;
     //grad/xi
     aplLstExmPcObt?: string;
     //masters below
     aplGradCourseTaken?: string;
     aplGradExmPcObt?: string;

     //HS & Grad Examination Marks Details
     aplLastMilSub?: string;
     aplLastElecSub1?: string;
     aplLastElecSub2?: string;
     aplLastElecSub3?: string;
     aplLastElecSub4?: string;
     aplLastEngMrk?: string;
     aplLastMilMrk?: string;
     aplLastElec1Mrk?: string;
     aplLastElec2Mrk?: string;
     aplLastElec3Mrk?: string;
     aplLastElec4Mrk?: string;

     //Extra Curricular Activities
     aplExtraCur?: string;

     //Bank Account details
     aplBnkHldrNm?: string;
     aplBnkAcNum?: string;
     aplBnkCnfAcNum?: string;
     aplBnkNam?: string;
     aplBnkBrnch?: string;
     aplBnkIfsc?: string;
     eduhistory_table?:string;
}