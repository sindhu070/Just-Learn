

import { HttpClient } from '@angular/common/http';
import { Component, OnInit,HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { quizService } from '../quiz.service';
import { StudentService } from '../student.service';
import { SubjectService } from '../subject.service';
import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';
import { QuizQuestions } from '../QuizQuestions';




import { QuizConfig } from '../quiz-config';
import { CheckboxVal } from '../CheckboxVal';
import { GreetingsComponent } from '../greetings/greetings.component';


@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css']
})
export class DisplayQuizComponent implements OnInit {
   quizid:string;
   studentid:string;
   qd:any;
   optrad:string;
   config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  quizName: string;
  quiz:any;
  time:any;
  radioselected:any;
  quizquestions:any;
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  mode: string;
  singleans=false;
  multipleans=false;
  blanks=false;
  radioSel: any;
  checkboxval:CheckboxVal[];
  myMap = new Map();
  c: number;
  studentroll: string;
  attempted: any;
  constructor(private location: Location,private quizservice:quizService,private matDialog:MatDialog,private http: HttpClient,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) {}
  

  ngOnInit() {
  
 
    this.quizid = this.route.snapshot.paramMap.get('quizid');
    this.studentroll = this.route.snapshot.paramMap.get('rollno');
    this.quizservice.getsubmissiondetails(this.studentroll,this.quizid).subscribe(inform=>{
    this.attempted=inform.attempted;
    if(this.attempted===true){
      let dialogRef = this.matDialog.open(GreetingsComponent,{
        data: {
        title:"Quiz",
        message:"You have already attempted the quiz! Sorry!",
        }
      });
      dialogRef.afterClosed().subscribe(result=> {
        console.log(`dialog result:${result}`)
        if(result === 'true'){
          //alert("Successfully logged in");
          this.okay();
        }
      });
    } else{
    
    this.loadQuiz();
    this.radioselected = "item_3";
    }
    });
  
  }


  loadQuiz() {
    this.quizservice.getquestiondetails(this.quizid).subscribe(res => {
    this.quizquestions = res;
    this.quizservice.getQuizDetailsByQuizId(this.quizid).subscribe(dataval=>{
      this.config.duration=dataval.time*60;
   
      // var ch3=this.checkboxval;
      // this.quizquestions.forEach((x,index)=>{
      //   if(x.type==2){
      //     x.options.forEach(y=>{
      //       let ch1: CheckboxVal = new CheckboxVal();
      //       ch1.qno=index+1;
      //       ch1.id=y;
      //       ch1.isSelected=false;
      //       this.checkboxval.push(ch1);

      //     }); 
      //   }
      // });
      // console.log(ch3)
     console.log(this.quizquestions)
      this.pager.count = this.quizquestions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
     
      this.duration = this.parseTime(dataval.time*60);
    });
  })
    this.mode = 'quiz';
  }


  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    // console.log(diff)

    if (diff >= this.config.duration) {
      clearInterval(this.timer); 
      this.onSubmit();
   
    }
    this.ellapsedTime = this.parseTime(diff);
 
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quizquestions) ?
      this.quizquestions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(type:number,myMap:Map<number,string[]>,n:number,option:string) {
    var opt:string[] = [];
    // myMap.set(n,opt)
    if(type ==2 ) {
    if(myMap.get(n)==undefined){
      myMap.set(n,opt);
    } 
    opt = myMap.get(n);
    if(!(opt.includes(option))) {
    opt.push(option);
    myMap.set(n,opt) //set
    console.log(opt);
    console.log(myMap);
    }else{
      opt.splice(opt.indexOf(option),1)
      myMap.set(n,opt);
      console.log(opt);
      console.log(myMap);
    }
  } else{
    if(myMap.get(n)==undefined){
      myMap.set(n,opt);
    }
    // opt = myMap.get(n);
    opt.push(option);
    myMap.set(n,opt) //set
    console.log(opt)
    console.log(myMap);
  }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }
  getSelecteditem(){
    this.radioSel = this.quizquestions.options.find(Item => Item.value === this.radioselected);
   
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    
    }
   
  }

  // isAnswered(question: Question) {
  //   return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  // };

  // isCorrect(question: Question) {
  //   return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  // };

  onSubmit() {
      let count = 0;
      // let ans:string[] = [];
      this.quizquestions.forEach((element,index) => {
     let ans = this.myMap.get(index+1);
      if(ans!=undefined){
        ans.sort();
      }
      if(element.correctanswers!=undefined){
      element.correctanswers.sort();
      }
      // element.correctanswers = element.correctanswers.sort();
      if(JSON.stringify(ans)==JSON.stringify(element.correctanswers)){
        count=count+element.marks; 
      }
    });
  this.c=count;
  console.log(this.c)
  this.mode = 'result';
  this.quizservice.submitmarks(this.studentroll,this.quizid,this.c).subscribe(data=>{
    console.log(data);
  });
  }

  getval(qno:number) : boolean {
    var z = false;
    if(this.myMap.has(qno)){
      var x = this.myMap.get(qno);
      if(x!=undefined){
        x.sort();
      }
      if(y!=undefined){
        y.sort();
      }
      var y = this.quizquestions[qno-1].correctanswers;
      if(JSON.stringify(x)==JSON.stringify((y))){
        z = true;
      } else {
        z = false;
      }
    } else {
      z = false;
    }
    return z

  }

  getans(qno:number) : string {
    var x = this.myMap.get(qno);
    return x
  }

  getcorrectans(qno:number) : string {
    return this.quizquestions[qno-1].correctanswers;
  }
  getmarks(qno:number) : number {
    var z = 0;
    if(this.myMap.has(qno)){
      var x = this.myMap.get(qno);
      var y = this.quizquestions[qno-1].correctanswers;
      if(x!=undefined){
        x.sort();
      }
      if(y!=undefined){
        y.sort();
      }
      if(JSON.stringify(x)==JSON.stringify(y)){
        z = this.quizquestions[qno-1].marks;
      } else {
        z = 0;
      }
    } else {
      z = 0;
    }
    return z
  }

  okay() {
    this.location.back();
    }
    @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
      let result = confirm("Caution:Your quiz will be submitted");
      console.log(result)
      if (result) {
        console.log(result)
        // Do more processing...
        this.router.navigate(['/'])
      }else{
      event.returnValue = false;
      } // stay on same page
    }
 















  // home(){
  //   this.router.navigate(['sw',this.studentid]);
  //   }
  //   myaccount() {
  //     this.router.navigate(['myaccount',this.studentid]);
  //   }
  //   logout() {
  //   this.router.navigate(['/']);
  //   }
    
}

