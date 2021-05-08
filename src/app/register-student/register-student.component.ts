import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { student } from '../student';
import { student1 } from '../student1';
import { StudentService } from '../student.service';
import { GreetingsComponent } from '../greetings/greetings.component';
import { MatDialog } from '@angular/material';
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
  rpass:string;
  student: student = new student();
  student1: student1 = new student1();
  constructor(private matDialog:MatDialog,private router:Router,private studentservice : StudentService){}

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
      
      if(this.pass==this.rpass  && this.email != undefined && this.username != undefined && this.rollnumber!=undefined ) {
      this.student.emailid=this.email;
      this.student.name=this.username;
      this.student.phoneno = this.phoneno;
      this.student.rollnumber = this.rollnumber;
      this.username = this.username.replace(this.re, '_');
      this.student1.username=this.email;
      this.student1.password=this.pass;
     if(this.phoneno.length==10) {
      // tslint:disable-next-line: deprecation
      this.studentservice.loginStudent(this.student1).subscribe(data1 => {
        console.log(data1);
        if(data1==="Added successfully") {
      this.studentservice.registerStudent(this.student).subscribe(data => {
        console.log(data);
     

     
      if(data==="Added successfully")
      {
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Registration",
          message:"Registration Successful. Please login to continue",
          }
        
        });
        dialogRef.afterClosed().subscribe(result=> {
          console.log(`dialog result:${result}`)
          if(result === 'true'){
            //alert("Successfully logged in");
            this.router.navigate(['Studentlogin']);
    
          }
        });
      } else {
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Registration",
          message:"Registration is not Successful",
          }
        
        });
        dialogRef.afterClosed().subscribe(result=> {
          console.log(`dialog result:${result}`)
          if(result === 'true'){
            //alert("Successfully logged in");
            location.reload();
    
          }
        });
      }
      

         
      }, error => console.log(error));
    }else{
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Registration",
        message:data1,
        }
      
      });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true'){
          //alert("Successfully logged in");
          location.reload();
  
        }
      });
  }
    });
        
    } else{
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Registration",
        message:"Phone number should be 10 digits",
        }
      
      });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true'){
          //alert("Successfully logged in");
          location.reload();
  
        }
      });
    }
    }  else {
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Registration",
        message:"Please check all the data",
        }
      
      });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true'){
          //alert("Successfully logged in");
          location.reload();
  
        }
      });
  }
    }
  
    loadLogin() : void {
      this.router.navigate(['Studentlogin']);
    }

    home(){
      this.router.navigate(['/']);
    }
    about() {
      this.router.navigate(['/'], { fragment: 'about' });
    }
    contact(){
      this.router.navigate(['/'], { fragment: 'contact' });
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
