import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DboxComponent } from '../dbox/dbox.component';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { student } from '../student';
import { StudentWelcomeComponent } from '../student-welcome/student-welcome.component';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  studentid:string;
  stu: student = new student();
  constructor(private matDialog:MatDialog,private route: ActivatedRoute,private router:Router,private studentservice:StudentService) { }

  ngOnInit() {
    this.studentid = this.route.snapshot.paramMap.get('id');
    this.studentservice.retreiveStudentDetailsById(this.studentid).subscribe(data=>{
      console.log(data);
      this.stu=data;
    });
  } 
  updatePhone(phoneno:string) {
    let dialogRef = this.matDialog.open(InlineEditComponent,{
      height: '200px',
      width: '400px',
      data: {
      title : "Phone number Updation",
      id:this.studentid,
      }
    });
  }
  home(){
    this.router.navigate(['sw',this.studentid]);
    }
    myaccount() {
     location.reload();
    }
    logout() {
    this.router.navigate(['/']);
    }

}
