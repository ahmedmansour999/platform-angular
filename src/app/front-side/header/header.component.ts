import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenClass } from '../../class/token-class';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})
export class HeaderComponent {

  userToken : any  ;

  constructor(private tokenClass : TokenClass , private authApi :AuthService , private router : Router){}

  ngOnInit(): void {
    this.userToken = this.tokenClass.getData('userAccess');
  }

  public logout(){
    this.tokenClass.removeData('userAccess') ;
    this.authApi.logout() ;
    this.router.navigate(['/login'])
  }



}
