import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SubjectService } from '../subject.service';
import { StudentService } from '../student.service';
import { TeacherService } from '../teacher.service';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { quizService } from '../quiz.service';
import { QuizMarks } from '../QuizMarks';
@Component({
  selector: 'app-show-marks-student',
  templateUrl: './show-marks-student.component.html',
  styleUrls: ['./show-marks-student.component.css']
})
export class ShowMarksStudentComponent implements OnInit {
    teacherid:string;
    quizid: string;
    qm:any;
  quizname: any;
  constructor(private quizservice:quizService,private location: Location,private matDialog:MatDialog,private http: HttpClient,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.teacherid = this.route.snapshot.paramMap.get('id');
    this.quizid = this.route.snapshot.paramMap.get('quizid');
    this.quizservice.getmarks(this.quizid).subscribe(info=>{
      this.qm=info;
      this.quizname = this.qm[0].quizname;
      console.log(info)
    });
  }


  back() {
    this.location.back();
    }
    home(){
      this.router.navigate(['tw',this.teacherid]);
    }
    myaccount(){
      this.router.navigate(['teacheraccount',this.teacherid]);
    }
    logout() {
      this.router.navigate(['/']);
    }
}
