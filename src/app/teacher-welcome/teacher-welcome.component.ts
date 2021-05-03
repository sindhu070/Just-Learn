import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GreetingsComponent } from '../greetings/greetings.component';
import { SubjectService } from '../subject.service';
import { Subcodes } from '../SubjectCodes';
import { TeacherService } from '../teacher.service';
import { TeacherClassroom } from '../teacherclasses';

@Component({
  selector: 'app-teacher-welcome',
  templateUrl: './teacher-welcome.component.html',
  styleUrls: ['./teacher-welcome.component.css']
})
export class TeacherWelcomeComponent implements OnInit {
  teacherid:string;
  tname:string;
  id:string;
  show = false;
  show1=false;
  show2=false;
  subjectname : string;
  yearsec:string;
  subcodes : Subcodes = new Subcodes();
  teacherclassroom : TeacherClassroom = new TeacherClassroom();
  tclass : TeacherClassroom[];
  
  constructor(private modalService: NgbModal,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog,private teacherservice:TeacherService,private subjectservice:SubjectService) { }

  ngOnInit() {
    this.teacherid = this.route.snapshot.paramMap.get('id');
    this.teacherservice.findTeacherById(this.teacherid).subscribe(data=> {
      this.tname= data.name;
      this.id = data.id;
      this.display(this.id);
    });
  }
  create() : void {
    this.show=!this.show;
    
  }

  submitclass() {
    this.subjectservice.findlastrow().subscribe(value=>{
      var code = parseInt(value.subcode) + 1;
      var code1 = code.toString();
    
    this.teacherservice.createClassroom(code1,this.subjectname,this.id,this.yearsec).subscribe(d=>
      {
        if (d==='Added successfully') {
          let dialogRef = this.matDialog.open(GreetingsComponent,{
            data: {
            title:"Confirmation",
            message:"Classroom is created successfully",
             username:this.tname
            }
          });
          dialogRef.afterClosed().subscribe(result=> {
            console.log(`dialog result:${result}`)
            if(result === 'true'){
              //alert("Successfully logged in");
              location.reload();
              this.show = false;
      
            }
          });
        }
      });
    });
  }

  display(id) : void {
    this.teacherservice.getClassDetails(id).subscribe(data1=> {
      console.log(data1)
      console.log(data1.length)
      if (data1.length == 0){
        this.show1 = false;
        this.show2 = true;
        this.show=false;
      } else {
        this.tclass =  data1;
        this.show2 = false;
        this.show1 = true;
        this.show=false;
      }      
    });
  }
  openClass(sid) : void {
    this.router.navigate(['teachermain/',sid,this.teacherid]);
  }




  
  home(){
    location.reload();
  }
  about() {
    this.router.navigate(['/']);
  }
  contact(){
    this.router.navigate(['/']);
  }
  logout() {
    this.router.navigate(['/']);
  }

}
