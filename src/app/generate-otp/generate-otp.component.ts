import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { EnterOtpComponent } from '../enter-otp/enter-otp.component';
import { GreetingsComponent } from '../greetings/greetings.component';
import { LoginService } from '../Login.service';
import { StudentService } from '../student.service';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrls: ['./generate-otp.component.css']
})
export class GenerateOtpComponent implements OnInit {
  public spinkit = Spinkit;
  email:string;
  loading: boolean;
  constructor(@Inject(MAT_DIALOG_DATA)private con:any,private loginservice:LoginService,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog) { }

  ngOnInit() {
  }
  generateOTP(email) {
   this.loginservice.generateOTP(email).subscribe(data=>{
    //  console.log(data);
     if(data != "Email id does not exist") {
       console.log("Val:",email)
      let dialogRef = this.matDialog.open(EnterOtpComponent,{
        height: '300px',
        width: '400px',
        data: {
        title : "Verification",
        otp:data,
        emailid:email,
        message:"A verification code has been sent your mail-id.Enter below"
        }
      });
     } else {
      let dialogRef = this.matDialog.open(GenerateOtpComponent,{
        height: '250px',
        width: '400px',
        data: {
        title : "Verification",
        message:data
        }
      });
     }
     // call enter-otp dialogbox
    });
  }
}
  

