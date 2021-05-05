import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { GreetingsComponent } from '../greetings/greetings.component';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-inline-edit',
  templateUrl: './teacher-inline-edit.component.html',
  styleUrls: ['./teacher-inline-edit.component.css']
})
export class TeacherInlineEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)private con:any,private teacherservice:TeacherService,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog) { }

  ngOnInit() {
  }
  act(phoneno:string){
    this.teacherservice.updatePhonenumber(this.con.id,phoneno).subscribe(data=>{
      console.log(data);
      if(data==='Phoneno Updated successfully'){
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Updation",
          message:"Phoneno Updated successfully",
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
          title:"Updation unsuccessful",
          message:data,
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
