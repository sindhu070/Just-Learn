import { Component, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { teacher } from '../teacher';
import { TeacherInlineEditComponent } from '../teacher-inline-edit/teacher-inline-edit.component';
import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-myaccount-teacher',
  templateUrl: './myaccount-teacher.component.html',
  styleUrls: ['./myaccount-teacher.component.css']
})
export class MyaccountTeacherComponent implements OnInit {
  teacherid:string;
 tea: teacher = new teacher();
  constructor(private location: Location,private matDialog:MatDialog,private route: ActivatedRoute,private router:Router,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.teacherid = this.route.snapshot.paramMap.get('tid');
    this.teacherservice.findTeacherById(this.teacherid).subscribe(data=>{
      this.tea=data;
      console.log(this.tea);
    });
  }
  updatePhone(phoneno:string) {
    let dialogRef = this.matDialog.open(TeacherInlineEditComponent,{
      height: '250px',
      width: '400px',
      data: {
      title : "Phone number Updation",
      id:this.teacherid,
      }
    });
  }
  home(){
    this.router.navigate(['tw',this.teacherid]);
    }
    back() {
      this.location.back();
      }
    myaccount() {
     location.reload();
    }
    logout() {
    this.router.navigate(['/']);
    }

}
