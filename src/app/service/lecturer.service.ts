import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenClass } from '../class/token-class';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  lecturerApi = 'http://127.0.0.1:8000/api/lecturer';
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

  public allLecturer(): Observable<any> {
    return this.http.get(this.lecturerApi, { headers: this.headers });
  }

  public oneLecturer(id: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/lecturer/${id}`;
    return this.http.get(url, { headers: this.headers });
  }

  updateLecturer(id: any, updatedData: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/lecturer/${id}`;
    return this.http.put(url, updatedData, { headers: this.headers });
  }

  public deletelecturer(id: any): Observable<any> {
    const url = `http://127.0.0.1:8000/api/lecturer/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }
}
