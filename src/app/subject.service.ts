import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { student} from './student';
import { student1} from './student1';
import { login} from './login';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080/jl";

  findlastrow() : Observable<any> {
    return this.http.get(`${this.baseUrl}/getclasscodes`);

  }

  getSubjectDetailsBySubcode(subcode:string) : Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getsubjectdetails/${subcode}`);
  }

  
}