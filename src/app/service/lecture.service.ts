import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  lectureApi = 'http://127.0.0.1:8000/api/lecture' ;
  updateLectureApi = 'http://127.0.0.1:8000/api/updateLecture' ;
  lecturerPdfApi = 'http://127.0.0.1:8000/api/lecturerPdf';

  constructor( private http : HttpClient ) { }

  public allLecture() : Observable<any> {
    return this.http.get(this.lectureApi) ;
  }

  public oneLecture(id : number) : Observable<any> {
    const url = `${this.lectureApi}/${id}` ;
    return this.http.get(url) ;
  }


  public lecturerPdf(id : number) : Observable<any> {
    const url = `${this.lecturerPdfApi}/${id}` ;
    return this.http.get(url).pipe(
      catchError(error=>{
        return throwError(error) ;
      })
    )
  }
  public updateLecture(data :any ,  id : number) : Observable<any> {
    const url = `${this.updateLectureApi}/${id}` ;
    return this.http.post(url , data).pipe(
      catchError(error=>{
        return throwError(error) ;
      })
    )
  }

  public createLecture(data:any){
    return this.http.post(this.lectureApi , data) ;
  }

  public deltePdf(id : number) : Observable<any> {
    const url = `${this.lectureApi}/${id}` ;
    return this.http.delete(url).pipe(
      catchError(error=>{
        return throwError(error) ;
      })
    )
  }


}
