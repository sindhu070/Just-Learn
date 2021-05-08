import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignments } from '../Assignment';
import { GreetingsComponent } from '../greetings/greetings.component';
import { joinedStudents } from '../joinedStudents';
import { Stream } from '../Stream';
import { student } from '../student';
import { StudentService } from '../student.service';
import { SubjectService } from '../subject.service';
import { TeacherService } from '../teacher.service';
import { Spinkit } from 'ng-http-loader';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-teacher-main',
  templateUrl: './teacher-main.component.html',
  styleUrls: ['./teacher-main.component.css']
})
export class TeacherMainComponent implements OnInit {
  public spinkit = Spinkit;
   subjectid : string;
   studarray : string[];
   fileUrl;
   sj:joinedStudents = new joinedStudents();
   stu=false;
   assignment=false;
   material = false;
   displayAssignment=false;
   selectedFile: File;
   disp=true;
   message: string;
   title1 : string;
   teacherid:string;
   fileContent: string = '';
   sjarray:joinedStudents[];
   displayfiles:Stream[];
   assignments:Assignments[];
  constructor(private datePipe: DatePipe,private matDialog:MatDialog,private http: HttpClient,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.subjectid = this.route.snapshot.paramMap.get('sid');
    this.Uploadmaterial();
    this.display();
    this.teacherid = this.route.snapshot.paramMap.get('tid');
    // var date:any = new Date();
    // console.log(this.datePipe.transform(date,"yyyy-MM-dd"));
    // var date1:any = new Date("2021-05-09");
    // console.log(this.datePipe.transform(date1,"yyyy-MM-dd"));
    // var diffDays:any = Math.floor((date1 - date) / (1000 * 60 * 60 * 24));
    // console.log(diffDays)
    // if(diffDays <=5 ){
    //   console.log("hello")
    // }
    }
    ch(si:number){
      if(si==0){
        this.Uploadmaterial();
      } else if(si==1){
        this.assign();
       
      } else if(si==2){
        this.stuDetails();
       
      }
    }

    stuDetails() : void {
      this.stu=true;
      this.material=false;
      this.displayAssignment=false;
      this.disp=false;
      this.assignment=false;
      this.teacherservice.getJoinedStudents(this.subjectid).subscribe(info=>{
        console.log(info)
        this.sjarray=info;
      });
    }

    Uploadmaterial() {
      this.stu=false;
      this.material=true;
      this.disp=true;
      this.assignment=false;
      this.displayAssignment=false;
    }

    assign() {
      this.stu=false;
      this.material=false;
      this.disp=false;
      this.assignment=true;
      this.displayAssignment=true;
      this.getAssignmentDetails();
    }
    public onFileChanged(event) {
          //Select File
          this.selectedFile = event.target.files[0];
        }
        //Gets called when the user clicks on submit to upload the image
    onUpload() {
          console.log(this.selectedFile);
          //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests. 
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile);
  // this.http.post(`http://localhost:8080/jl/photos/add`, uploadImageData);
    //Make a call to the Spring Boot Application to save the image
    this.teacherservice.uploadMaterial(uploadImageData,this.title1,this.subjectid).subscribe((response) => {
        console.log(response)
        if (response === "Material Uploaded Successfully") {
          console.log('File uploaded successfully');
          location.reload();

        } else {
          console.log('File havenot uploaded successfully');
          location.reload();
        }
      }
      );
      }
  display() : void {

    this.teacherservice.getFiles(this.subjectid).subscribe(data=>{
      this.displayfiles=data;
      if(data.length==0){
        this.disp=false;
      }else {
        this.disp=true;
      }
      console.log(data);
    });
    }

    openFile(fileid:string) : void {
      window.open(`http://localhost:8080/jl/files/stream/${fileid}`, '_blank');
      // this.teacherservice.openFile(fileid).subscribe(fileinfo=>{
      //   console.log(fileinfo);
      // });
    }

    uploadAssignment(assititle:string,ques:string,total:number,date:Date) : void {
      this.teacherservice.saveAssignmentDetails(assititle,ques,total,this.subjectid,date).subscribe(data=>
        {
          if(data==="Added successfully"){
            let dialogRef = this.matDialog.open(GreetingsComponent,{
              data: {
              title:"Assignment Details",
              message:"Assignment added succesfully",
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
    }

    getAssignmentDetails() : void {
      this.teacherservice.getAssignmentDetails(this.subjectid).subscribe(info=>
        {
          this.assignments=info;
          console.log(info)
        });
    }
    showStudentAssignmentDetails(aid:string) : void {
       this.router.navigate(['assignment',aid,this.teacherid]);
      

    }



















    home(){
      this.router.navigate(['tw',this.teacherid]);
    }
    myaccount() {
      this.router.navigate(['teacheraccount',this.teacherid]);
    }
    logout() {
      this.router.navigate(['/']);
    }

}
