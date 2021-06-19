import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader'; 
import { GreetingsComponent } from './greetings/greetings.component';
import { StudentWelcomeComponent } from './student-welcome/student-welcome.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DboxComponent } from './dbox/dbox.component';
import { TeacherWelcomeComponent } from './teacher-welcome/teacher-welcome.component';
import { TeacherMainComponent } from './teacher-main/teacher-main.component';
import { StudentMainComponent } from './student-main/student-main.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyaccountTeacherComponent } from './myaccount-teacher/myaccount-teacher.component';
import { TeacherInlineEditComponent } from './teacher-inline-edit/teacher-inline-edit.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { UploadQuizComponent } from './upload-quiz/upload-quiz.component';
import { DisplayQuestionTypeComponent } from './display-question-type/display-question-type.component';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';
import { ShowMarksStudentComponent } from './show-marks-student/show-marks-student.component';
import { AppPasswordDirective } from './app-password.directive';
import { ChangeDeadlineComponent } from './change-deadline/change-deadline.component';


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
    InlineEditComponent,
    TeacherWelcomeComponent,
    TeacherMainComponent,
    StudentMainComponent,
    AssignmentListComponent,
    DeleteConfirmationComponent,
    MyaccountComponent,
    MyaccountTeacherComponent,
    TeacherInlineEditComponent,
    ResetPasswordComponent,
    GenerateOtpComponent,
    EnterOtpComponent,
    NavbarComponent,
    UploadQuizComponent,
    DisplayQuestionTypeComponent,
    DisplayQuizComponent,
    ShowMarksStudentComponent,
    AppPasswordDirective,
    ChangeDeadlineComponent,

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
    NgHttpLoaderModule,
    MatRadioModule,
    AppRoutingModule,RouterModule.forRoot(routes,{
      anchorScrolling: 'enabled'
 })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    DboxComponent,
    GreetingsComponent,
    DeleteConfirmationComponent,
    InlineEditComponent,
    TeacherInlineEditComponent,
    GenerateOtpComponent,
    EnterOtpComponent,
    ResetPasswordComponent,
    NavbarComponent,
    DisplayQuestionTypeComponent,
    ChangeDeadlineComponent

  ]
})
export class AppModule {
 
}



