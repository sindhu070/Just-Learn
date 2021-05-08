import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { GreetingsComponent } from '../greetings/greetings.component';
import { teacher } from '../teacher';
import { TeacherService } from '../teacher.service';
import { teacher1 } from '../teacher1';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent {
  constructor(private matDialog:MatDialog,private router:Router,private teacherservice : TeacherService){}
  isShown: boolean = false ; 
  username : string;
  email : string;
  phoneno : string;
  rollnumber : number;
  pass:string;
  rpass:string
  teacher: teacher = new teacher();
  teacher1: teacher1 = new teacher1();

 re= / /g;


  onFocusEvent(event: any){

    this.isShown = true;
  }
  onFocusOutEvent(event: any){

    this.isShown = false;
  }
  registerTeacher(): void {
    
    // replaces space with _
    
    if(this.pass==this.rpass  && this.email != undefined && this.username != undefined) {
    this.teacher.emailid=this.email;
    this.teacher.name=this.username;
    this.teacher.phonenumber = this.phoneno;
    this.username = this.username.replace(this.re, '_');
    this.teacher1.username=this.email;
    this.teacher1.password=this.pass;
    
    if(this.phoneno.length==10) {
    // tslint:disable-next-line: deprecation
    this.teacherservice.loginStudent(this.teacher1).subscribe(data1 => {
      console.log("na bondha" + data1);
     if(data1==="Added successfully") {
    this.teacherservice.registerTeacher(this.teacher).subscribe(data => {
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
            this.router.navigate(['Teacherlogin']);
    
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
  } else{
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
    this.router.navigate(['Teacherlogin']);
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
