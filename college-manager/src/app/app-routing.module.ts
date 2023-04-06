import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'student-registration', component: RegisterStudentComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', canActivate: [AuthGuard], loadChildren: ()=>import('./modules/dashboard/dashboard.module').then((mod)=> mod.DashboardModule)},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
