import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  aboutus=false;
  constructor(private router:Router,private studentservice:StudentService,private matDialog:MatDialog) {}

  home(){
    this.router.navigate(['/']);
  }
  about(){
    this.router.navigate(['/'], { fragment: 'about' });
  }
  contact() {
    this.router.navigate(['/'], { fragment: 'contact' });
  }
  register(){
    let dialogRef = this.matDialog.open(NavbarComponent,{
      height: '200px',
      width: '600px',
      
      data: {
      title : "Registration",
      b1:"Register as Student",
      b2:"Register as Teacher"
      }
    });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true1'){
          this.router.navigate(['Studentregister']);
        } else if(result === 'false') {
          this.router.navigate(['Teacherregister']);
        }
    });
  }
 login(){
    let dialogRef = this.matDialog.open(NavbarComponent,{
      height: '200px',
      width: '500px',
      data: {
      title : "Login",
      b1:"Login as Student",
      b2:"Login as Teacher"
      }
    });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true1'){
          this.router.navigate(['Studentlogin']);
        } else if(result === 'false') {
          this.router.navigate(['Teacherlogin']);
        }
    });
  }


  sindhu(){
    window.open("https://www.linkedin.com/in/sindhu-sai-52389a1a1/", "_blank");
  }
  aditya(){
    window.open("https://www.linkedin.com/in/kanduri-sai-sangameswara-aadithya-39b848192/", "_blank");
  }
  vaidehi(){
    window.open("https://www.linkedin.com/in/vaidehi-kolluru-9939591a0", "_blank");
  }
  vasanth(){
    window.open("https://www.linkedin.com/in/vasanth-raj-29664417a/", "_blank");
  }
}
