import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { login } from '../login';
import { student } from '../student';
import { MatDialog } from '@angular/material/dialog'

import { StudentService } from '../student.service';
import { GreetingsComponent } from '../greetings/greetings.component';
import { GenerateOtpComponent } from '../generate-otp/generate-otp.component';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  username : string;
  password : string;
  login1: login = new login();
  student: student = new student();
  student1: any;
  show: boolean;
  id : number;
  constructor(private router:Router,private studentservice:StudentService,private matDialog:MatDialog) {
    this.show = false;
   
  }

  @Input() public message = '';
  @Input('alert-pop') public msg1 = '';
  public showAlert() : void {
    alert(this.msg1);
  }
  // @Output() onEvent = new EventEmitter<any>();
  // public data :any= {};
  // public subscribe(d:any) : void {
  //   let str="your name" + d.name;
  //   str += "Your email" + d.email;
  //   alert(str);
  // }


loadRegister() : void {
  this.router.navigate(['Studentregister']);
}

login(): void {
  this.login1.username=this.username;
  this.login1.password=this.password;
  if(this.login1.password==undefined || this.login1.username==undefined){
    let dialogRef = this.matDialog.open(GreetingsComponent,{
      data: {
      title:"Login Window",
      message:"Please Fill all the Fields",
      }
    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result:${result}`)
      if(result === 'true'){
        //alert("Successfully logged in");
        this.password='';
      }
    });
  } else {
  this.studentservice.retreiveStudentDetailsByEmail(this.login1.username).subscribe(d=>
    {    
      this.id = d.id;
 this.studentservice.CheckLoginStudent(this.login1).subscribe(data1 => {
  console.log(data1);
  if (data1 === 'passwords matched') {
    let dialogRef = this.matDialog.open(GreetingsComponent,{
      data: {
      title:"Login",
      message:"Logged in successfully",
       username:this.username
      }
    
    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result:${result}`)
      if(result === 'true'){
        //alert("Successfully logged in");
        this.router.navigate(['sw',this.id]);

      }
    });
  
  } else {
    let dialogRef = this.matDialog.open(GreetingsComponent,{
      data: {
      title:"Login",
      message:data1,
       username:this.username
      }
    
    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result:${result}`)
      if(result === 'true'){
        //alert("Successfully logged in");
        this.password='';

      }
    });
  }
});
});
  }

}
passwordm() {
  this.show = !this.show;
}
enterEmail() {
  let dialogRef = this.matDialog.open(GenerateOtpComponent,{
    height: '250px',
    width: '400px',
    data: {
    title : "Verification"

    }
  });

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