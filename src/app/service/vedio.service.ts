import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VedioService {

  vedioApi = 'http://127.0.0.1:8000/api/vedio' ;
  AllvedioApi = 'http://127.0.0.1:8000/api/allVedio' ;
  vedioLecturerApi = 'http://127.0.0.1:8000/api/vediolecturer' ;

  constructor(private http : HttpClient) { }


  public allVedio(){
    return this.http.get(this.AllvedioApi) ;
  }

  public vedioLecturer(id:number):Observable<any>{
    const url = `${this.vedioLecturerApi}/${id}`
    return this.http.get(url).pipe(
      catchError(error =>{
        return throwError(error)
      })
    ) ;
  }

  public AddVedio(vedioData:any):Observable<any>{
    return this.http.post(this.vedioApi , vedioData).pipe(
      catchError(error => {
        return throwError(error);
      })
    ) ;
  }


  public oneVedio(id : number):Observable<any>{
    const url = `${this.vedioApi}/${id}`
    return this.http.get(url).pipe(
      catchError(error=>{
        return throwError(error) ;
      })
    )
  }


  public updateVedio(vedioData:any , id:number ):Observable<any>{
    const url = `http://127.0.0.1:8000/api/updateVedio/${id}` ;
    return this.http.post(url , vedioData).pipe(
      catchError(error => {
        return throwError(error);
      })
    ) ;
  }

  public deleteVedio(id : number):Observable<any>{
    const url = `${this.vedioApi}/${id}`
    return this.http.delete(url).pipe(
      catchError(error=>{
        return throwError(error) ;
      })
    )
  }
}
