import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { student} from './student';
import { student1} from './student1';
import { login} from './login';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080/jl";

  registerStudent(student: student): Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(student);

    return this.http.post(`${this.baseUrl}/savestudentdetails/`, body, {headers: header, responseType: 'text'});
  }
  loginStudent(student1:student1) : Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(student1);
    return this.http.post(`${this.baseUrl}/savelogindetails/`, body, {headers: header, responseType: 'text'});
  }

  CheckLoginStudent(login: login) : Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(login);
    return this.http.post(`${this.baseUrl}/checklogindetails/`, body, {headers: header, responseType: 'text'});
  }

  retreiveStudentDetailsByEmail(email : string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/getstudentdetails/email/${email}`);
  }
  retreiveStudentDetailsById(id : string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/getstudentdetails/id/${id}`);
  }

  joinStudent(rollnumber:string,subcode:string) : Observable<any> {
    var rolls=[];
    // alert("1" + rolls);
    rolls.push(rollnumber);
    var obj = {"substuds":rolls};
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(obj);
    // alert(body)
    return this.http.put(`${this.baseUrl}/joinstudents/${subcode}`, body, {headers: header, responseType: 'text'});
  }

  getClassroomDetails(sid:string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/getclassdetails/${sid}`);
  }

  getStudentDetailsByRollnumber(roll:string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/getstudentdetails/rollnumber/${roll}`);
  }
   
  uploadAssignment(file:FormData,aid:string,sid:string,title:string) : Observable<any> {
    const header = {'Content-type': false};
    return this.http.post(`${this.baseUrl}/assians/add/${aid}/?title=${title}&studid=${sid}`,file,{responseType:'text'});
  }

  getAllAssignmentDetails(srollno:string,subcode:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getassignmentdetails/${srollno}/${subcode}`);
  }
  leaveOff(sid:string,subcode:string) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/leaveoff/subcode/${subcode}/${sid}`,{responseType:'text'})

  }

  updatePhonenumber(studentid:string,phoneno:string) : Observable<any> {
    const header = {'content-type': 'application/json'};
    var obj = {
      "phoneno":phoneno,
      "id":studentid
    }
    const body = JSON.stringify(obj);
    return this.http.put(`${this.baseUrl}/phonenumbers/sid`,body, {headers: header, responseType: 'text'})
  }


}
