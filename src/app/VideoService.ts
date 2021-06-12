import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { teacher} from './teacher';
import { teacher1} from './teacher1';
import { login} from './login';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
    constructor(private http: HttpClient) { }
    private baseUrl = "http://localhost:8080/jl";
    
createVideo(startdate:Date,enddate:Date,gtime:Date,subcode:string){
    const header = {'content-type': 'application/json'};
    const obj = {
        "subcode": subcode,
        "startdate": startdate,
        "enddate": enddate,
        "gracetime": gtime,
      }
    const body = JSON.stringify(obj);
    console.log("done1");
    console.log(body);
    console.log("done2");
    return this.http.post(`${this.baseUrl}/saveVideochatDetails`, body, {headers: header, responseType: 'text'});
}

getmeetdetails(subcode:string){
  return this.http.get(`${this.baseUrl}/getvideochatdetails/${subcode}`);
}
}