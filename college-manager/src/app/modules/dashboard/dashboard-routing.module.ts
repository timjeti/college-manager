import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CourseRegistrationComponent } from './components/course-registration/course-registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'course-register', component: CourseRegistrationComponent },
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
    ],
  },
  // {
  //   path: 'student-register',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import(
  //       './components/student-registration/student-registration.module'
  //     ).then((mod) => mod.StudentRegistrationModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
