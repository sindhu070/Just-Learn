import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { quizService } from '../quiz.service';
import { StudentService } from '../student.service';
import { SubjectService } from '../subject.service';
import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';
import { QuizQuestions } from '../QuizQuestions';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { QuizConfig } from '../quiz-config';
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
  constructor(private location: Location,private quizservice:quizService,private matDialog:MatDialog,private http: HttpClient,private route: ActivatedRoute,private router:Router,private subjectservice:SubjectService,private studentservice:StudentService,private teacherservice:TeacherService) {}

  ngOnInit() {
    this.quizid = this.route.snapshot.paramMap.get('quizid');
    this.studentid = this.route.snapshot.paramMap.get('sid');
    this.loadQuiz();
    this.radioselected = "item_3";
    

  }

  loadQuiz() {
    this.quizservice.getquestiondetails(this.quizid).subscribe(res => {
      this.quizquestions = res;
     console.log(this.quizquestions)
      this.pager.count = this.quizquestions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.quizquestions.time);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
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

  onSelect(option:string[]) {
    console.log(option)
    // if (options.length>1) {
    //   if(correctanswers.length==1){

    //   }
    //   // question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; 
    //   }
    

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
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
  }

















  home(){
    this.router.navigate(['sw',this.studentid]);
    }
    myaccount() {
      this.router.navigate(['myaccount',this.studentid]);
    }
    logout() {
    this.router.navigate(['/']);
    }
    
}
