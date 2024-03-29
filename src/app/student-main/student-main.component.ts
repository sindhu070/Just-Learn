import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignments } from '../Assignment';
import { GreetingsComponent } from '../greetings/greetings.component';
import { joinedStudents } from '../joinedStudents';
import { ListOfUploads } from '../ListOfUploads';
import { Stream } from '../Stream';
import { StudentService } from '../student.service';
import { SubjectService } from '../subject.service';
import { TeacherService } from '../teacher.service';
import {DatePipe, formatDate} from '@angular/common';
import { quizService } from '../quiz.service';
import { VideoService } from '../VideoService';
import { Video } from '../Video';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.css']
})
export class StudentMainComponent implements OnInit {
   subjectid:string;
   studentid:string;
   studarray : string[];
   fileUrl;
   sj:joinedStudents = new joinedStudents();
   stu=false;
   quizarray:any;
   what=false;
   material = false;
   selectedFile: File;
   disp=true;
   lol=true;
   assignment=false;
   message: string;
   title1 : string;
   teacherid:string;
   fileContent: string = '';
   sjarray:joinedStudents[];
   displayfiles:Stream[];
   assignments:ListOfUploads[];
   rollnumber: string;
   marks:number;
  username:string;
  disableTextbox=false;
  today:Date;
  uploads:string[];
  latest_date:any;
  displayquizlist=false;
  jstoday: any;
  startdates:any;
  enddates: string;
  v: any;
  constructor(private videoservice:VideoService,private quizservice:quizService,private datePipe: DatePipe,private matDialog:MatDialog,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.subjectid = this.route.snapshot.paramMap.get('sid');
    this.studentid = this.route.snapshot.paramMap.get('stuid');
    this.studentservice.retreiveStudentDetailsById(this.studentid).subscribe(inform=>{
      this.rollnumber=inform.rollnumber;
      this.username=inform.username;
      this.today=new Date();
      this.latest_date =this.datePipe.transform(this.today, 'yyyy-MM-dd');
      this.getquizdetails();

      
    });
    this.display();
  }
  ch(si:number){
    if(si==0){
      this.Seematerial();
    } else if(si==1){
      this.assignDisplay()
    } else if(si==2){
      this.stuDetails();
    } else if(si==3){
      this.quiz();
    }
  }
 Seematerial() {
    this.stu=false;
    // this.material=true;
    this.disp=true;
    this.assignment=false;
    this.displayquizlist=false;
    
  }
  stuDetails() : void {
    this.stu=true;
    this.material=false;
    this.displayquizlist=false;
    this.disp=false;
    this.assignment=false;
    this.teacherservice.getJoinedStudents(this.subjectid).subscribe(info=>{
      console.log(info)
      this.sjarray=info;
      //console.log(info.rollnumber)
      //this.rollnumber=info.rollnumber;
    });
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

quiz(){
  this.stu=false;
  this.material=false;
  this.displayquizlist=true;
  this.disp=false;
  this.assignment=false;


}
getquizdetails(){
  this.quizservice.getquizdetails(this.subjectid).subscribe(info=>{

    this.quizarray=info;
    // this.quizservice.getmarks()
    console.log(info);
  });
}
checkmarks(id:string) {
  this.quizservice.getmarks(id).subscribe(inform=>{
    console.log(inform[0])
  if(inform[0]!=null){
    let dialogRef = this.matDialog.open(GreetingsComponent,{
      data: {
      title:"Quiz Marks",
      message:"You scored: " + inform[0].marks + " marks in " + inform[0].quizname,
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

}
openFile(fileid:string) : void {
window.open(`http://localhost:8080/jl/files/stream/${fileid}`, '_blank');
// this.teacherservice.openFile(fileid).subscribe(fileinfo=>{
//   console.log(fileinfo);
// });
}

assignDisplay() : void {
  this.stu=false;
  this.disp=false;
  this.assignment=true;
  this.displayquizlist=false;
 this.getAssignmentDetails();
}
getAssignmentDetails() : void {
  this.studentservice.getAllAssignmentDetails(this.rollnumber,this.subjectid).subscribe(info=>
    {
      this.assignments=info;
      console.log(info)
  
    });
}
public onFileChanged(event) {
  //Select File
  this.selectedFile = event.target.files[0];
}
//Gets called when the user clicks on submit to upload the image
onUpload(aid:string) {
  console.log(this.selectedFile);
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests. 
const uploadImageData = new FormData();
uploadImageData.append('file', this.selectedFile);
// this.http.post(`http://localhost:8080/jl/photos/add`, uploadImageData);
//Make a call to the Spring Boot Application to save the image
this.studentservice.uploadAssignment(uploadImageData,aid,this.rollnumber,this.selectedFile.name).subscribe((response) => {
console.log(response)
if (response === "Assignment uploaded Successfully.") {
  let dialogRef = this.matDialog.open(GreetingsComponent,{
    data: {
    title:"Upload",
    message:"Assignment has been uploaded",
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


} else {
  console.log('File havenot uploaded successfully');
  location.reload();
}

});
}
openquiz(quizid:string,startdate:Date,enddate:Date){
  let today=Date.now();
  this.startdates = formatDate(startdate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0000');
  this.enddates=formatDate(enddate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0000');
  this.jstoday=formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  // alert(this.startdates);
  // alert(this.enddates);
  // alert(this.jstoday)
  if(this.jstoday<=this.enddates && this.jstoday>=this.startdates){
    this.router.navigate(['seequiz',quizid,this.rollnumber]);
  } else {
    let dialogRef = this.matDialog.open(GreetingsComponent,{
      data: {
      title:"Upload",
      message:"Cannot attempt this quiz rightnow! Time's up",
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
}

joinmeet(){
  let today=Date.now();
  this.jstoday=new Date(formatDate(today, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0530'));
   this.videoservice.getmeetdetails(this.subjectid).subscribe(info=>{
     if(info==null){
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Meet",
        message:"No Meet scheduled as of now",
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
    console.log(info);
    this.v = info;
    var new_startdate = new Date(formatDate(this.v.startdate, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0000'));
    var new_enddate = new Date(formatDate(this.v.enddate, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0000'));
    console.log(this.v.url)
    var s = `http://localhost:3000`+this.v.url;
    if(this.v.gracetime>0 && this.jstoday<=new_enddate && this.jstoday>=new_startdate) {
      var additional_time = new Date(new_startdate.getTime() + this.v.gracetime*60000);
      console.log(additional_time)
      if(additional_time>=this.jstoday){
        window.open(s, "_blank");
      }else{
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Meet",
          message:"You have crossed the grace time period",
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
    } else{
     if(this.jstoday<=new_enddate && this.jstoday>=new_startdate){
      window.open(s, "_blank");
     }else {
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Meet",
        message:"Please Check the meet timings and join again",
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
  }
   });
  
}










home(){
this.router.navigate(['sw',this.studentid]);
}
myaccount() {
  this.router.navigate(['myaccount',this.studentid]);
}
logout() {
this.router.navigate(['/']);
}

}
