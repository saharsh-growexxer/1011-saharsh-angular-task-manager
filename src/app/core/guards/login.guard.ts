import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})


export class LoginGuard implements CanActivate {
  constructor(
    private readonly login:LoginService, private router:Router
  ){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.login.usersdata);
      if(!localStorage.getItem('currentUser')){
        return true;
    }else{
      this.router.navigate(['/dashboard']);
    }
      return false;
      } 
  
}
