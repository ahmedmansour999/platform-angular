import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = "http://127.0.0.1:8000/api/admin" ;
  constructor(private http:HttpClient) {  }

  public allAdmin(id :any) {

    const path = `${this.url}/${id}`
    return this.http.get(path) ;
  }

  public currentAdmin(id :any) {
    const currentUrl = 'http://127.0.0.1:8000/api/currentAdmin' ;
    const path = `${currentUrl}/${id}`
    return this.http.get(path) ;
  }

  public delete(id :any) {
    const currentUrl = "http://127.0.0.1:8000/api/deleteAdmin" ;
    const path = `${currentUrl}/${id}`
    return this.http.delete(path) ;
  }
}
