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
   what=false;
   material = false;
   selectedFile: File;
   disp=true;
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
  uploads:string[];
  constructor(private matDialog:MatDialog,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.subjectid = this.route.snapshot.paramMap.get('sid');
    this.studentid = this.route.snapshot.paramMap.get('stuid');
    this.studentservice.retreiveStudentDetailsById(this.studentid).subscribe(inform=>{
      this.rollnumber=inform.rollnumber;
      this.username=inform.username;
      
    })
    this.display();
  }
  ch(si:number){
    if(si==0){
      this.Seematerial();
    } else if(si==1){
      this.assignDisplay()
    } else if(si==2){
      this.stuDetails();
     
    }
  }
 Seematerial() {
    this.stu=false;
    // this.material=true;
    this.disp=true;
    this.assignment=false;
  }
  stuDetails() : void {
    this.stu=true;
    this.material=false;
    this.disp=false;
    this.assignment=false;
    this.teacherservice.getJoinedStudents(this.subjectid).subscribe(info=>{
      console.log(info)
      this.sjarray=info;
      console.log(info[0].rollnumber)
      this.rollnumber=info.rollnumber;
    });
  }

 
  // public onFileChanged(event) {
  //   //Select File
  //   this.selectedFile = event.target.files[0];
  // }
  //Gets called when the user clicks on submit to upload the image
// onUpload() {
//     console.log(this.selectedFile);
//     //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests. 
// const uploadImageData = new FormData();
// uploadImageData.append('file', this.selectedFile);
// // this.http.post(`http://localhost:8080/jl/photos/add`, uploadImageData);
// //Make a call to the Spring Boot Application to save the image
// this.teacherservice.uploadMaterial(uploadImageData,this.title1,this.subjectid).subscribe((response) => {
//   console.log(response)
//   if (response === "Material Uploaded Successfully") {
//     console.log('File uploaded successfully');
//     location.reload();

//   } else {
//     console.log('File havenot uploaded successfully');
//     location.reload();
//   }
// }
// );
// }
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

assignDisplay() : void {
  this.stu=false;
  this.disp=false;
  this.assignment=true;

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
    }
  });


} else {
  console.log('File havenot uploaded successfully');
  location.reload();
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
