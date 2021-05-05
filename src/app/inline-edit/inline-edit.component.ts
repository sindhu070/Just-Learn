import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { GreetingsComponent } from '../greetings/greetings.component';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.css']
})
export class InlineEditComponent implements OnInit {
   scode :string;
  constructor(@Inject(MAT_DIALOG_DATA)private con:any,private studentservice:StudentService,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog) { }
  ngOnInit() {
  }

act(phoneno:string){
this.studentservice.updatePhonenumber(this.con.id,phoneno).subscribe(data=>{
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
    this.router.navigate(['myaccount',this.con.id]);
  }

}
