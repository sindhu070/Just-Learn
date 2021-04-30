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
    return this.http.post(`${this.baseUrl}/materials/add/${subcode}/?title=${tile}`,file,{responseType:'text'});

  }
  getFiles(subcode:string) :Observable<any> {
    return this.http.get(`${this.baseUrl}/files/subcode/${subcode}`);
  } 
}