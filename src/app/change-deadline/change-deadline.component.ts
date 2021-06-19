import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { GreetingsComponent } from '../greetings/greetings.component';
import { quizService } from '../quiz.service';

@Component({
  selector: 'app-change-deadline',
  templateUrl: './change-deadline.component.html',
  styleUrls: ['./change-deadline.component.css']
})
export class ChangeDeadlineComponent implements OnInit {
  quizenddate:any;
  constructor(@Inject(MAT_DIALOG_DATA)private con1:any,private quizservice:quizService,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog) { }


  ngOnInit() {
  }
  submit(deadline:any){
    console.log(this.con1.data)
    console.log(deadline)
    this.quizservice.changeenddate(this.con1.data,deadline).subscribe(info=>{
     if(info === 'Deadline Updated successfully'){
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Deadline Details",
        message:"Deadline Updated Succesfully",
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
  }

}
