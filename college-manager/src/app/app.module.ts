import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ContentareaComponent } from './wrapper/contentarea/contentarea.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './wrapper/side-bar/side-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ApplicantReviewComponent } from './wrapper/contentarea/applicant-review/applicant-review.component';
import { ApplicantDocsComponent } from './wrapper/contentarea/applicant-review/applicant-docs/applicant-docs.component';
import { EducationTableComponent } from './wrapper/contentarea/registration/education-table/education-table.component';
import { CoursesComponent } from './wrapper/contentarea/academics/courses/courses.component';
import { SubjectsComponent } from './wrapper/contentarea/academics/subjects/subjects.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CourseDialogComponent } from './wrapper/contentarea/academics/courses/course-dialog/course-dialog.component';
import { SidenavAutosize } from './sidenavbar/sidenavbar.component';
import { MatMenuModule} from '@angular/material/menu'
import { SubjectDialogComponent } from './wrapper/contentarea/academics/subjects/subject-dialog/subject-dialog.component';
import { RejectedlistComponent } from './wrapper/contentarea/applicant-review/rejectedlist/rejectedlist.component';
import { AdmitdialogComponent } from './wrapper/contentarea/applicant-review/selectedList/admitdialog/admitdialog.component';
import { FeeheadComponent } from './wrapper/contentarea/applicant-review/feehead/feehead.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    ContentareaComponent,
    SideBarComponent,
    routingComponents,
    ApplicantReviewComponent,
    ApplicantDocsComponent,
    EducationTableComponent,
    CoursesComponent,
    SubjectsComponent,
    CourseDialogComponent,
    SidenavAutosize,
    SubjectDialogComponent,
    RejectedlistComponent,
    AdmitdialogComponent,
    FeeheadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    PdfViewerModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [],
  //bootstrap: [AppComponent],
  bootstrap: [SidenavAutosize],
})
export class AppModule {}