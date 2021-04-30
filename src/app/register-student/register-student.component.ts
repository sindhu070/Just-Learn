import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { student } from '../student';
import { student1 } from '../student1';
import { StudentService } from '../student.service';
declare var $: any;
@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent  {
  username : string;
  email : string;
  phoneno : string;
  rollnumber : number;
  pass:string;
  student: student = new student();
  student1: student1 = new student1();
  constructor(private router:Router,private studentservice : StudentService){}

  isShown: boolean = false ; // hidden by default

  re = / /g;
 



  onFocusEvent(event: any){

    this.isShown = true;
  }
  onFocusOutEvent(event: any){

    this.isShown = false;
  }
  registerUser(): void {
    
      // replaces space with _
      

      this.student.emailid=this.email;
      this.student.name=this.username;
      this.student.phoneno = this.phoneno;
      this.student.rollnumber = this.rollnumber;
      this.username = this.username.replace(this.re, '_');
      this.student1.username=this.email;
      this.student1.password=this.pass;

      // tslint:disable-next-line: deprecation
      this.studentservice.registerStudent(this.student).subscribe(data => {
        console.log(data);
     
      this.studentservice.loginStudent(this.student1).subscribe(data => {
        console.log(data);
      });
        
          alert('Registration Successful! Please login to continue!');
      
          this.router.navigate(['Studentlogin']);
         
      }, error => console.log(error));
    }
  
    loadLogin() : void {
      this.router.navigate(['Studentlogin']);
    }

    home(){
      this.router.navigate(['/']);
    }
    about() {
      this.router.navigate(['/']);
    }
    contact(){
      this.router.navigate(['/']);
    }
    rstu(){
      this.router.navigate(['Studentregister']);
    }
    rtea(){
      this.router.navigate(['Teacherregister']);
    }
    lstu(){
      this.router.navigate(['Studentlogin']);
    }
    ltea(){
      this.router.navigate(['Teacherlogin']);
    }
    
  
}
