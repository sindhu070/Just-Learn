import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { StudentWelcomeComponent } from './student-welcome/student-welcome.component';
import { TeacherMainComponent } from './teacher-main/teacher-main.component';
import { TeacherWelcomeComponent } from './teacher-welcome/teacher-welcome.component';

const routes: Routes = [
    {path:'Studentregister', component:RegisterStudentComponent},
    {path:'Studentlogin', component:LoginStudentComponent},
    {path:'Teacherregister', component:RegisterTeacherComponent},
    {path:'Teacherlogin', component:LoginTeacherComponent},
    {path:'home', component:HomeComponent},
    {path:'sw/:id', component:StudentWelcomeComponent},
    {path:'tw/:id', component:TeacherWelcomeComponent},
    {path:'teachermain/:sid', component:TeacherMainComponent},
    {path:'', redirectTo: 'home', pathMatch:'full'}
    
];

@NgModule({
    declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }