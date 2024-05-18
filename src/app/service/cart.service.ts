import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartApi  = "http://localhost:8000/api/cart" ;

  constructor(private http : HttpClient) { }

  public  allCart():Observable<any>{
    return this.http.get(this.cartApi) ;
  }

  public AddCart(data :any ):Observable<any>{
    return this.http.post(this.cartApi , data)
  }

  public deleteCart(id:number):Observable<any>{
    const url = `${this.cartApi}/${id}` ;
    return this.http.delete(url);
  }

  public userCart( id: number ):Observable<any>{
    const url = `http://localhost:8000/api/userCarts/${id}` ;
    return this.http.get(url);
  }

}
