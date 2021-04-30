import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatTabsModule} from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GreetingsComponent } from './greetings/greetings.component';
import { StudentWelcomeComponent } from './student-welcome/student-welcome.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DboxComponent } from './dbox/dbox.component';
import { TeacherWelcomeComponent } from './teacher-welcome/teacher-welcome.component';
import { TeacherMainComponent } from './teacher-main/teacher-main.component';
const routes: Routes = [
  {
      path: '',
      redirectTo: 'login', 
      pathMatch: 'full'
  },

];
@NgModule({
  declarations: [
    GreetingsComponent,

    AppComponent,
    HomeComponent,

    RegisterStudentComponent,
    LoginStudentComponent,
    LoginTeacherComponent,
    RegisterTeacherComponent,
    StudentWelcomeComponent,
    DboxComponent,
    TeacherWelcomeComponent,
    TeacherMainComponent,

  ],
  
  imports: [
    BrowserModule,
    NgbModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DboxComponent,
    GreetingsComponent

  ]
})
export class AppModule {
 
}



