import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { GreetingsComponent } from '../greetings/greetings.component';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-dbox',
  templateUrl: './dbox.component.html',
  styleUrls: ['./dbox.component.css']
})
export class DboxComponent implements OnInit {
   scode :string;
  constructor(@Inject(MAT_DIALOG_DATA)private con:any,private studentservice:StudentService,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog) { }
  ngOnInit() {
  }

  act(){
    this.studentservice.joinStudent(this.con.rollnumber,this.scode).subscribe(data=>
      {
        console.log(data);
        if(data==='Updated successfully'){
          let dialogRef = this.matDialog.open(GreetingsComponent,{
            data: {
              title:"Join Info",
              username:this.con.username,
              message:"You have Joined the class successfully!"
            }
          });
          dialogRef.afterClosed().subscribe(result=> {
            console.log(`dialog result:${result}`)
            if(result === 'true'){
              location.reload();
            }
          });
        } else {
          let dialogRef = this.matDialog.open(GreetingsComponent,{
            data: {
              title:"Failed to Join",
              username:this.con.username,
              message:data
            }
          });
          dialogRef.afterClosed().subscribe(result=> {
            console.log(`dialog result:${result}`)
            if(result === 'true'){
              location.reload();
            }
          });
        }
      });
  }
  close() : void {
    location.reload();
  }

}
