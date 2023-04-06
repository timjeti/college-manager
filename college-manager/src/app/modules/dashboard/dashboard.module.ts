import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule} from '../../material.module'
import { CourseRegistrationComponent } from './components/course-registration/course-registration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CourseRegistrationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    PdfViewerModule
  ]
})
export class DashboardModule { 
  constructor(){
    console.log("Dashboard module loaded !")
  }
}
