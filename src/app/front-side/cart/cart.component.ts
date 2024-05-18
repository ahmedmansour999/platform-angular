import { TokenClass } from '../../class/token-class';
import { CartService } from './../../service/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  user_id : number = 0 ;
  carts : any ;

  constructor(private cartApi:CartService , private tokenApi : TokenClass ){}

  ngOnInit(): void {
    const TokenData = this.tokenApi.getData('userAccess') ;
    this.user_id = TokenData.id ;
    this.cartApi.userCart(this.user_id).subscribe((data)=>{
      this.carts = data ;
      console.log(this.carts);

    })
  }

}
