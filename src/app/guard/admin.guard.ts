import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenClass } from '../class/token-class';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor( private router: Router , private auth:AuthService , private token : TokenClass ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    if (this.token.getData('userAccess').role !== 'control') {
      return this.router.parseUrl('notAllow')
    }
    return true ;

  }
}
