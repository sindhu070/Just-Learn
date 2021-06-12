import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { GreetingsComponent } from '../greetings/greetings.component';
import { MatDialog } from '@angular/material';
import {MatCard} from '@angular/material/card'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DboxComponent } from '../dbox/dbox.component';
import { stringify } from '@angular/core/src/util';
import { Classroom } from 'src/classes';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-student-welcome',
  templateUrl: './student-welcome.component.html',
  styleUrls: ['./student-welcome.component.css']
})
export class StudentWelcomeComponent implements OnInit {
studentid : string;
sname : string;
see = false;
show =  false;
show1 = false;
  
closeResult: string;
  roll: any;
  id: any;
  cr: Classroom = new Classroom();
  classes : Classroom[];
  constructor(private modalService: NgbModal,private route: ActivatedRoute,private router:Router,private matDialog:MatDialog,private studentservice:StudentService) { }

  ngOnInit() {
    this.studentid = this.route.snapshot.paramMap.get('id');
    this.studentservice.retreiveStudentDetailsById(this.studentid).subscribe(data=> {
      this.sname = data.name;
      this.roll=data.rollnumber;
      this.id = data.id;
      this.display(this.id);
    });
    
  }

  join() : void
  {
    let dialogRef = this.matDialog.open(DboxComponent,{
      height: '250px',
      width: '400px',
      data: {
      title : "Join",
      rollnumber: this.roll,
      id:this.id,
      username:this.sname
      }
    
    });
    
  }

  display(id) : void {
    this.studentservice.getClassroomDetails(id).subscribe(data1=> {
      if (data1.length == 0){
        this.show = true;
        this.show1 = false;
      } else {
        this.classes =  data1;
        this.show1 = true;
        this.show = false;
      }

      
    });
  }
  openClass(sid:string) : void {
    this.router.navigate(['studentmain',sid,this.studentid]);
  }
  leaveOff(subcode:string) : void {
    let dialogRef = this.matDialog.open(DeleteConfirmationComponent,{
      data: {
      title:"Confirmation",
      message:"Are you sure you want to leave the class?",
       username:this.sname
      }
    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result:${result}`)
      if(result === 'true'){
        //alert("Successfully logged in");
        this.studentservice.leaveOff(this.studentid,subcode).subscribe(data=>{
          console.log(data)
          if(data==='Successfully left off') {
            location.reload();
          }
        });
      } else if(result === 'false'){
        location.reload();
      }
    });
  }



  home(){
    location.reload();
  }
  myaccount() {
    this.router.navigate(['myaccount',this.studentid]);
  }
  logout() {
    this.router.navigate(['/']);
  }

 
  

}
