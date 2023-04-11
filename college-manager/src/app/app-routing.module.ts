import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent} from './wrapper/contentarea/registration/registration.component'
import { RegisteredListComponent } from './wrapper/contentarea/applicant-review/registeredlist/registeredList.component';
import { RegistrationImageHandlerComponent } from './wrapper/contentarea/registration/registration-image-handler/registration-image-handler.component';
import { ApplicantDocsComponent } from './wrapper/contentarea/applicant-review/applicant-docs/applicant-docs.component';
import { CoursesComponent } from './wrapper/contentarea/academics/courses/courses.component';
import { SubjectsComponent } from './wrapper/contentarea/academics/subjects/subjects.component';
import { RegistrationviewComponent } from './wrapper/contentarea/registration/registrationview/registrationview.component';
import { VerifiedlistComponent } from './wrapper/contentarea/applicant-review/verifiedlist/verifiedlist.component';
import { SelectedlistComponent } from './wrapper/contentarea/applicant-review/selectedList/selectedlist.component';
import { RejectedlistComponent } from './wrapper/contentarea/applicant-review/rejectedlist/rejectedlist.component';
import { AdmitdialogComponent } from './wrapper/contentarea/applicant-review/selectedList/admitdialog/admitdialog.component';
import { FeeheadComponent } from './wrapper/contentarea/applicant-review/feehead/feehead.component';

export const routingComponents = [
  RegistrationComponent,
  RegistrationImageHandlerComponent,
  RegisteredListComponent,
  CoursesComponent,
  SubjectsComponent,
  RegistrationviewComponent,
  VerifiedlistComponent,
  SelectedlistComponent,
  RejectedlistComponent,
  AdmitdialogComponent,
  FeeheadComponent
]

const routes: Routes = [
    { path: 'registration1', component: RegistrationComponent},
    { path: 'registration2', component: RegistrationImageHandlerComponent},
    { path: 'registeredList', component: RegisteredListComponent },
    { path: 'verifiedList', component: VerifiedlistComponent },
    { path: 'registeredList/docs', component: ApplicantDocsComponent },
    { path: 'registeredList/courses', component: CoursesComponent },
    { path: 'registeredList/subjects', component: SubjectsComponent },
    { path: 'registeredList/view', component: RegistrationviewComponent },
    { path: 'selectedList', component: SelectedlistComponent },
    { path: 'rejectedList', component: RejectedlistComponent },
    { path: 'admitAplicant', component: AdmitdialogComponent },
    { path: 'addFeehead', component: FeeheadComponent }
    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }