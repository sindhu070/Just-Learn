
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { student} from './student';
import { student1} from './student1';
import { login} from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080/jl";

  generateOTP(email:string) {
    const header = {'content-type': 'application/json'};
    var obj ={
        "username":email
    }
    const body = JSON.stringify(obj);
    return this.http.post(`${this.baseUrl}/generateotp`, body, {headers: header, responseType: 'text'});
  }

  resetPassword(email:string,password:string) : Observable<any>{
    const header = {'content-type': 'application/json'};
    var obj ={
      "username" : email,
      "password": password
    }
    const body = JSON.stringify(obj);
    return this.http.post(`${this.baseUrl}/resetpassword`, body, {headers: header, responseType: 'text'});
  }
}