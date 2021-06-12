import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { student} from './student';
import { student1} from './student1';
import { login} from './login';
import { Quiz } from './Quiz';
import { QuizQuestions } from './QuizQuestions';

@Injectable({
  providedIn: 'root'
})
export class quizService {
    constructor(private http: HttpClient) { }
    private baseUrl = "http://localhost:8080/jl";

savequizdetails(q:Quiz) {
  const header = {'content-type': 'application/json'};
  const body = JSON.stringify(q);
  return this.http.post(`${this.baseUrl}/savequizdetails`, body, {headers: header, responseType: 'text'});
}
getquizdetails(subcode:string){
  return this.http.get(`${this.baseUrl}/getquizdetails/${subcode}`);
}
savequestiondetails(qd:QuizQuestions){
  const header = {'content-type': 'application/json'};
  const body = JSON.stringify(qd);
  return this.http.post(`${this.baseUrl}/savequizquestions`, body, {headers: header, responseType: 'text'});
}
getquestiondetails(quizid:string){
  return this.http.get(`${this.baseUrl}/getsubmissiondetails/${quizid}`);
}
deletequestion(questionid:string) {
  return this.http.delete(`${this.baseUrl}/deletequizquestions/${questionid}`,{responseType:'text'});
}
submitquiz(quizid:string){
  const header = {'content-type': 'application/json'};
  var obj = {
    "id":quizid
  }
  const body = JSON.stringify(obj);
  return this.http.put(`${this.baseUrl}/quizsubmit`, body, {headers: header, responseType: 'text'});
}
getQuizDetailsByQuizId(quizid:string){
  return this.http.get(`${this.baseUrl}/getsquizdetails/id/${quizid}`);
}

submitmarks(srollno:string,qid:string,marks:number){
  const header = {'content-type': 'application/json'};
  var obj = {
    "studentid":srollno,
    "marks":marks
  }
  const body = JSON.stringify(obj);
  return this.http.put(`${this.baseUrl}/quizmarks/${qid}`, body, {headers: header, responseType: 'text'});
}
 getmarks(quizid:string){
   return this.http.get(`${this.baseUrl}/getquizmarks/${quizid}`);
 }

 getsubmissiondetails(srollno:string,quizid){
  return this.http.get(`${this.baseUrl}/getsubmissiondetails/${quizid}/${srollno}`);
 }

}

