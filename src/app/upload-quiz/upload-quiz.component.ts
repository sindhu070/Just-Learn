import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DisplayQuestionTypeComponent } from '../display-question-type/display-question-type.component';
import { GreetingsComponent } from '../greetings/greetings.component';
import { quizService } from '../quiz.service';
import { QuizQuestions } from '../QuizQuestions';
import { StudentService } from '../student.service';
import { SubjectService } from '../subject.service';
import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-upload-quiz',
  templateUrl: './upload-quiz.component.html',
  styleUrls: ['./upload-quiz.component.css']
})
export class UploadQuizComponent implements OnInit {
quizid:string;
teacherid:string;
radio=false;
selected : string;
multiques=false;
blankques=false;
user:string;
singleques=false;
optionnew:boolean[];
question1:string;
qd:QuizQuestions= new QuizQuestions();
qd1:any;
opt1:string;
opt2:string;
opt3:string;
opt4:string;
optrad:any;
optcheck1:any;
optcheck2:any;
optcheck3:any;
optcheck4:any;
blank2:any;
disp=false;
selectedmark1:any="Select Marks";
displayquestions=false;
  contentEditable: boolean;
  constructor(private location: Location,private quizservice:quizService,private matDialog:MatDialog,private http: HttpClient,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.quizid = this.route.snapshot.paramMap.get('quizid');
    this.teacherid = this.route.snapshot.paramMap.get('tid');
    this.displayquestions=true;
    this.quizservice.getquestiondetails(this.quizid).subscribe(info=>{
      console.log(info);
      this.qd1 = info;
      if(this.qd1.length > 0){
        this.disp=true;
      } else {
        this.disp=false;
      }
     
    });
  }
  displayquestiontypes() {
  this.radio=true;

  }
  single() {
   this.singleques=true;
   this.multiques=false;
   this.blankques=false;
  }
  multiple() {
    this.singleques=false;
    this.multiques=true;
    this.blankques=false;
  }
  blank() {
    this.blankques=true;
    this.singleques=false;
    this.multiques=false;
  }
  addquestion() {
    if(this.question1===undefined || this.selectedmark1===undefined || this.opt1===undefined || this.opt2 === undefined || this.opt3===undefined || this.opt4 === undefined){
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Quiz",
        message:"Please enter the details",
        }
      });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true'){
            //
        }
      });
    } else {
    this.qd.question=this.question1;
    this.qd.type=1;
    let options : string[];
    this.qd.marks=this.selectedmark1;
    options = [this.opt1,this.opt2,this.opt3,this.opt4]
    let correctanswers=[];
    this.qd.options=options;
    this.qd.qid=this.quizid;
    if(this.optrad === undefined){
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Quiz",
        message:"Please Choose right option",
        }
      });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true'){
            //
        }
      });
    } else{
     if(this.optrad === "one"){
       correctanswers.push(this.opt1);
     } else if (this.optrad === "two") {
       correctanswers.push(this.opt2);
     }
     else if (this.optrad === "three") {
      correctanswers.push(this.opt3);
     }
     else if (this.optrad === "four") {
       correctanswers.push(this.opt4);
     }
     this.qd.correctanswers=correctanswers;
     this.quizservice.savequestiondetails(this.qd).subscribe(data=>{
      if(data==="Questions Added successfully"){
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Quiz",
          message:"Question Added succesfully",
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
}
}

  addmultiplequestion(){
    if(this.question1===undefined ||  this.selectedmark1===undefined || this.opt1===undefined || this.opt2 === undefined || this.opt3===undefined || this.opt4 === undefined){
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Quiz",
        message:"Please enter the details",
        }
      });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true'){
            //
        }
      });
    } else {
    this.qd.question=this.question1;
    let options : string[];
    this.qd.type=2;
    options = [this.opt1,this.opt2,this.opt3,this.opt4]
    let correctanswers=[];
    this.qd.marks=this.selectedmark1;
    this.qd.options=options;
    this.qd.qid=this.quizid;
    let ar = [this.optcheck1,this.optcheck2,this.optcheck3,this.optcheck4];
    let ar1=[];
    ar.forEach((value, index) => {
      if(value===true){
        ar1.push(index+1)
      }
  });
  console.log(ar1);
  if(ar1.length==0){
    let dialogRef = this.matDialog.open(GreetingsComponent,{
      data: {
      title:"Quiz",
      message:"Please enter the right answer of this question",
      }
    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result:${result}`)
      if(result === 'true'){
          //
      }
    });
  
  } else {
  for(var val of ar1){
    console.log(val)
    correctanswers.push(options[val-1])
  }
  this.qd.correctanswers=correctanswers;
  this.quizservice.savequestiondetails(this.qd).subscribe(data=>{
    if(data==="Questions Added successfully"){
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Quiz",
        message:"Question Added succesfully",
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
}
}
  addblankquestion(){
    if(this.question1===undefined || this.blank2===undefined || this.selectedmark1===undefined){
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Quiz",
        message:"Please enter the details",
        }
      });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true'){
            //
        }
      });
    } else{
    // alert(this.selectedmark1)
    this.qd.question=this.question1;
    this.qd.type=3;
    // let options : string[];
    // options = [];
    let correctanswers=[];
    let options=[];
    this.qd.qid=this.quizid;
    this.qd.marks=this.selectedmark1;
    let arr2 = options.filter(i => i !== null); 
    console.log(arr2);
    if(this.blank2 == undefined){
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Quiz",
          message:"Please give right answer",
          }
        });
        dialogRef.afterClosed().subscribe(result=> {
          console.log(`dialog result:${result}`)
          if(result === 'true'){
              //
          }
        });
       
    } else{
    correctanswers.push(this.blank2);
    this.qd.correctanswers=correctanswers;
    this.qd.options=arr2;
    this.quizservice.savequestiondetails(this.qd).subscribe(data=>{
      if(data==="Questions Added successfully"){
        let dialogRef = this.matDialog.open(GreetingsComponent,{
          data: {
          title:"Quiz",
          message:"Question Added succesfully",
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
  }
}

  deletequestion(quesid:string){
    let dialogRef = this.matDialog.open(DeleteConfirmationComponent,{
      data: {
      title:"Quiz",
      message:"Are you sure to delete this question?",
      }
    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result:${result}`)
      if(result === 'true'){
        this.quizservice.deletequestion(quesid).subscribe(data=>{
          console.log(data);
          if(data==="Question Deleted successfully"){
            let dialogRef = this.matDialog.open(GreetingsComponent,{
              data: {
              title:"Quiz",
              message:data,
              }
            });
            dialogRef.afterClosed().subscribe(result=> {
              console.log(`dialog result:${result}`)
              if(result === 'true'){
                this.quizservice.deletequestion(quesid).subscribe(data=>{
                  console.log(data);
                  if(data==="Question Deleted successfully"){
                     location.reload();
                  }
                });
              }
            });
          }
        });
      }
      else if(result === 'false'){
        location.reload();
      }
    });
   
  }




















  submitquiz(){
    this.quizservice.submitquiz(this.quizid).subscribe(info=>{
        if(info==="Updated successfully"){
          let dialogRef = this.matDialog.open(GreetingsComponent,{
            data: {
            title:"Quiz",
            message:"Quiz Uploaded successfully",
            }
          });
          dialogRef.afterClosed().subscribe(result=> {
            console.log(`dialog result:${result}`)
            if(result === 'true'){
              this.location.back();
            }
        });
        }
    });
}
  back() {
    this.location.back();
    }
  home(){
    this.router.navigate(['tw',this.teacherid]);
  }
  myaccount() {
    this.router.navigate(['teacheraccount',this.teacherid]);
  }
  logout() {
    this.router.navigate(['/']);
  }



}
