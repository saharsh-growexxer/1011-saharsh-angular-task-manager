import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    public readonly login: LoginService,
    public readonly router: Router,
    private http: HttpClient
  ) {}

  deleteUser() {
    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + token;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: bearer,
    });

    this.http
      .delete<any>('http://localhost:3000/api/users/me', { headers: header })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.login.logoutuser();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        },
      });
  }

  updateUser(user: any) {
    const params = {
      name: user.name,
      age: user.age,
    };

    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + token;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: bearer,
    });

    this.http
      .patch<any>('http://localhost:3000/api/users/me', params, {
        headers: header,
      })
      .subscribe({
        next: (data) => {
          this.login.setuser(data);
          console.log(data);
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        },
      });
  }
}
