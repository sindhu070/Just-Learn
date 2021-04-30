import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { joinedStudents } from '../joinedStudents';
import { student } from '../student';
import { StudentService } from '../student.service';
import { SubjectService } from '../subject.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-main',
  templateUrl: './teacher-main.component.html',
  styleUrls: ['./teacher-main.component.css']
})
export class TeacherMainComponent implements OnInit {
   subjectid : string;
   studarray : string[];
   fileUrl;
   sj:joinedStudents = new joinedStudents();
   stu=false;
   material = false;
   selectedFile: File;
   message: string;
   title1 : string;
   fileContent: string = '';
   sjarray:joinedStudents[];
  constructor(private sanitizer: DomSanitizer,private http: HttpClient,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.subjectid = this.route.snapshot.paramMap.get('sid');
    this.Uploadmaterial();
    this.display();
    }
    ch(si:number){
      if(si==0){
        this.Uploadmaterial();
      } else if(si==1){
       
      } else if(si==2){
        this.stuDetails();
       
      }
    }

    stuDetails() : void {
      this.stu=true;
      this.material=false;
      this.teacherservice.getJoinedStudents(this.subjectid).subscribe(info=>{
        console.log(info)
        this.sjarray=info;
      });
    }

    Uploadmaterial() {
      this.stu=false;
      this.material=true;
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
  uploadImageData.append('image', this.selectedFile);
  // this.http.post(`http://localhost:8080/jl/photos/add`, uploadImageData);
    //Make a call to the Spring Boot Application to save the image
    this.teacherservice.uploadMaterial(uploadImageData,this.title1,this.subjectid).subscribe((response) => {
        console.log(response)
        if (response === "Material Uploaded Successfully") {
          console.log('File uploaded successfully');
        } else {
          console.log('File havenot uploaded successfully');
        }
      }
      );
      }
  display() : void {
    this.teacherservice.getFiles(this.subjectid).subscribe(d=>{
    console.log(d)

    const data = d[1].file.data;
    const blob = new Blob([data], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
   
  });


}
}
