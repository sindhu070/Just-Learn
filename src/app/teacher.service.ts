import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { teacher} from './teacher';
import { teacher1} from './teacher1';
import { login} from './login';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080/jl";

  registerTeacher(teacher:teacher): Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(teacher);

    return this.http.post(`${this.baseUrl}/savefacultydetails/`, body, {headers: header, responseType: 'text'});
  }
  loginStudent(teacher1:teacher1) : Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(teacher1);
    console.log(body);
    return this.http.post(`${this.baseUrl}/savelogindetails/`, body, {headers: header, responseType: 'text'});
  }

  CheckLoginStudent(login: login) : Observable<any> {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(login);
    return this.http.post(`${this.baseUrl}/checklogindetails/`, body, {headers: header, responseType: 'text'});
  }
  findTeacherByEmail(email:string) : Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getfacultydetails/${email}`)
  }

  findTeacherById(id:string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/getfacultydetails/fid/${id}`)
  }

  createClassroom(subcode:string,subname:string,facultyid:string,yands:string) : Observable<any> {
    const header = {'content-type': 'application/json'};
    var obj = {
      "subcode": subcode,
      "subname": subname,
      "facultyid": facultyid,
      "yearandsection" : yands
      }
    const body = JSON.stringify(obj);
    return this.http.post(`${this.baseUrl}/savesubjectdetails`,body,{headers: header, responseType: 'text'});
  } 

  getClassDetails(fid:string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/getfacultyclasses/${fid}`)
  }

  getJoinedStudents(subcode:string) : Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getsubjectstudents/${subcode}`);
  }
  
  uploadMaterial(file:FormData,tile:string,subcode:string) :Observable<any>{
    const header = {'Content-type': false};
    return this.http.post(`${this.baseUrl}/addfiles/add/${subcode}/?title=${tile}`,file,{responseType:'text'});

  }
  getFiles(subcode:string) :Observable<any> {
    return this.http.get(`${this.baseUrl}/getallfiles/${subcode}`);
  } 
  openFile(fileid:string) :Observable<any> {
    return this.http.get(`${this.baseUrl}/files/stream/${fileid}`);
  }
  saveAssignmentDetails(title:string,ques:string,total:number,subcode:string,date:Date):Observable<any> {
    const header = {'content-type': 'application/json'};
    var obj = {
      "assiname":title,
      "assique":ques,
      "assimarks":total,
      "deadline":date
      }
    const body = JSON.stringify(obj);
    return this.http.post(`${this.baseUrl}/saveAssignmentdetails/${subcode}`,body,{headers: header, responseType: 'text'});
  }

  getAssignmentDetails(subcode:string) :Observable<any> {
    return this.http.get(`${this.baseUrl}/getallassignmentsofsub/${subcode}`);
  }
  getStudentAssignmentDetails(assignid:string):Observable<any> {
    return this.http.get(`${this.baseUrl}/getallassiansofassi/${assignid}`);
  }

  updateMarks(ansid:string,marks:number) : Observable<any> {
    const header = {'content-type': 'application/json'};
    var obj = {
      "id":ansid,
      "marks":marks
      // "verified":true
      }
    const body = JSON.stringify(obj);
    return this.http.put(`${this.baseUrl}/addmarks`,body,{headers: header, responseType: 'text'});
  }
  deleteClassroom(subcode:string) {
    return this.http.delete(`${this.baseUrl}/deleteclass/subcode/${subcode}`,{responseType: 'text'});
  }

  updatePhonenumber(teacherid:string,phoneno:string) : Observable<any> {
    const header = {'content-type': 'application/json'};
    var obj = {
      "phonenumber":phoneno,
      "id":teacherid
    }
    const body = JSON.stringify(obj);
    return this.http.put(`${this.baseUrl}/phonenumberf/fid`,body, {headers: header, responseType: 'text'})
  }
}


