import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { GreetingsComponent } from '../greetings/greetings.component';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)private con2:any,private loginservice:LoginService,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog) { }

  ngOnInit() {
  }
 update(pass:string,rpass:string) {
   if(pass===rpass){
     if(this.con2.emailid != undefined)
     this.loginservice.resetPassword(this.con2.emailid,pass).subscribe(data=>{
       console.log(data);
       if(data==="Password resetted successfully"){
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Reset Password",
          message:"Password Updated successfully!",
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
   } else {
    let dialogRef = this.matDialog.open(GreetingsComponent,{
      data: {
      title:"Reset Password",
      message:"Please check the values",
      }
    
    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result:${result}`)
      if(result === 'true'){
        //alert("Successfully logged in");
        let dialogRef = this.matDialog.open(ResetPasswordComponent,{
          height: '250px',
          width: '400px',
          data: {
          title : "Password Reset",
          emailid:this.con2.emailid
          }
     });
      }
    });
   }
 }
}
