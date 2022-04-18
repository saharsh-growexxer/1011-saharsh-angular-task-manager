import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<boolean> {
  constructor(
    private readonly login: LoginService,
    private httpClient: HttpClient
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + token;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: bearer,
    });
    this.httpClient
      .get<any>('http://localhost:3000/api/users/me', { headers: headers })
      .subscribe({
        next: (data) => {
          this.login.setuser(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    return of(true);
  }
}
