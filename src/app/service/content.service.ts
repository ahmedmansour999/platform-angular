import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenClass } from '../class/token-class';

@Injectable({
  providedIn: 'root'
})
export class ContentService {


  contentApi = 'http://127.0.0.1:8000/api/content';
  headers =  {
    // 'Authorization': `Bearer ${JSON.parse(this.tokenApi.getData('userAccess').token)}`
    'Authorization': `Bearer 2|KvVciQhjdKUuC3pr4az6Mu55lPf3AysbXhmWPcvT1bd043f1`
  }

  constructor(private http:HttpClient , private tokenApi : TokenClass) {

  }

  public allContent(){
    return this.http.get(this.contentApi , {headers : this.headers}) ;
  }

  public CourseContent(id : number){
    const url = 'http://127.0.0.1:8000/api/courseContent' ;
    return this.http.get(`${url}/${id}` , {headers : this.headers});
  }

  public addContent(data :any): Observable<any> {
    return this.http.post(this.contentApi , data  , {headers : this.headers}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public deleteContent(id : number): Observable<any> {
    const url = `${this.contentApi}/${id}` ;

    return this.http.delete(url).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }



}
