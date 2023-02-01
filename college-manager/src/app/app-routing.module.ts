import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent} from './wrapper/contentarea/registration/registration.component'
import { ApplicantdetailsComponent } from './wrapper/contentarea/applicant-review/applicantdetails/applicantdetails.component';
import { RegistrationImageHandlerComponent } from './wrapper/contentarea/registration/registration-image-handler/registration-image-handler.component';
import { ApplicantDocsComponent } from './wrapper/contentarea/applicant-review/applicant-docs/applicant-docs.component';

export const routingComponents = [RegistrationComponent,RegistrationImageHandlerComponent,ApplicantdetailsComponent]

const routes: Routes = [
    { path: 'registration1', component: RegistrationComponent},
    { path: 'registration2', component: RegistrationImageHandlerComponent},
    { path: 'registeredList', component: ApplicantdetailsComponent },
    { path: 'registeredList/docs', component: ApplicantDocsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
