import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { GenerateOtpComponent } from '../generate-otp/generate-otp.component';
import { GreetingsComponent } from '../greetings/greetings.component';
import { login } from '../login';
import { teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-login-teacher',
  templateUrl: './login-teacher.component.html',
  styleUrls: ['./login-teacher.component.css']
})
export class LoginTeacherComponent implements OnInit {
  id: any;
  show: boolean;

  constructor(private router:Router,private teacherservice:TeacherService,private matDialog:MatDialog) { }

  ngOnInit() {
  }
  username : string;
  password : string;
  login1: login = new login();
 teacher:teacher=new teacher();
  teacher1: any;
  loadRegister() : void {

    this.router.navigate(['Teacherregister']);
  }
  passwordm() {
    this.show = !this.show;
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
          location.reload();
        }
      });
    } else {
    this.teacherservice.findTeacherByEmail(this.login1.username).subscribe(d=>{
      this.id = d.id;
   this.teacherservice.CheckLoginStudent(this.login1).subscribe(data1 => {
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
          this.router.navigate(['tw',this.id]);
  
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
          location.reload();
  
        }
      });
    }
  });
});
    }
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
