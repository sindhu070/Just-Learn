import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentList } from '../AssignmentList';
import { GreetingsComponent } from '../greetings/greetings.component';
import { StudentService } from '../student.service';
import { SubjectService } from '../subject.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
   assignid:string;
   asl:AssignmentList[];
   teacherid:string;
  constructor(private matDialog:MatDialog,private http: HttpClient,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.assignid = this.route.snapshot.paramMap.get('aid');
    this.onload(this.assignid);
    this.teacherid = this.route.snapshot.paramMap.get('tid');
  }
  onload(aid:string) : void {
    this.teacherservice.getStudentAssignmentDetails(aid).subscribe(info=>{
     this.asl = info;
    });
  }

  submitMarks(ansid:string,marks:number) : void {
    this.teacherservice.updateMarks(ansid,marks).subscribe(data=> {
      if(data==="Updated successfully") {
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Assignment Details",
          message:"Marks Updated successfully",
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
    })

  }

  
  home(){
    this.router.navigate(['tw',this.teacherid]);
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
