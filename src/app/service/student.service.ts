import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenClass } from '../class/token-class';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = 'http://127.0.0.1:8000/api/student' ;
  token: string = "";
  headers!: HttpHeaders;

  constructor(private http: HttpClient, private tokenApi: TokenClass) {
    const userAccess = this.tokenApi.getData('userAccess');
    if (userAccess) {
      this.token = userAccess.token;
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      });
    }
  }


  public allStudent() : Observable<any> {
    return this.http.get(this.url) ;
  }

  public oneStudent(id: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/student/${id}`;
    return this.http.get(url, { headers: this.headers });
  }

  updateStudent(id: any, updatedData: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/student/${id}`;
    return this.http.put(url, updatedData, { headers: this.headers });
  }

  public deleteStudent(id: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/student/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }

}
