import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Login.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-enter-otp',
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.css']
})
export class EnterOtpComponent implements OnInit {
  // otp:string;
  constructor(@Inject(MAT_DIALOG_DATA)private con1:any,private loginservice:LoginService,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog) { }

  ngOnInit() {
    console.log("Entyer",this.con1.emailid)
  }
 submit(otp:string) {
   if(this.con1.otp===otp){
    let dialogRef = this.matDialog.open(ResetPasswordComponent,{
      height: '300px',
      width: '420px',
      data: {
      title : "Password Reset",
      emailid:this.con1.emailid
      }
 });
   } else {
    let dialogRef = this.matDialog.open(EnterOtpComponent,{
      height: '250px',
      width: '400px',
      data: {
      title : "Verification",
      otp:this.con1.otp
      }
 });
}
}
}
