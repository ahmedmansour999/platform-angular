import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerApi = 'http://127.0.0.1:8000/api/register' ;
  loginApi = 'http://127.0.0.1:8000/api/login' ;
  LogoutApi = 'http://127.0.0.1:8000/api/logout' ;
  private loggedIn = false ;

  constructor(private http : HttpClient) { }

  public register(data: any): Observable<any> {
    return this.http.post(this.registerApi, data ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  public login(data: any): Observable<any> {
    return this.http.post(this.loginApi, data).pipe(
      catchError(error => {
        return throwError(error);
      }),
      tap((res : any )=>{
        if (res.status === 'success') {
          this.setLoggedIn(true);
        }
      })
    );
  }

  public logout():Observable<any>{


    return this.http.get(this.LogoutApi)

  }

  public setLoggedIn(value: boolean): void {
    this.loggedIn = value;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
