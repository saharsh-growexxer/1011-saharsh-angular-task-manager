import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: any;
  token: any = [];
  userInformation: any = [];
  usersdata = [{}];
  constructor(private router: Router, private http: HttpClient) {}

  setdata(user: any) {
    let new_user = {
      name: user.name,
      email: user.email,
      password: user.password,
      age: user.age,
    };

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(new_user);
    this.user = this.http
      .post('http://localhost:3000/api/users', body, {
        headers: headers,
      })
      .subscribe((res) => {
        localStorage.clear();
        this.token = Object.values(res)[1];
        localStorage.setItem('token', this.token);
      });

    this.usersdata.push(user);
    this.router.navigate(['/login']);
  }

  getuser() {
    this.userInformation = localStorage.getItem('token') || null;
    this.userInformation = this.userInformation;
    return this.userInformation;
  }
  settoken(token: string) {
    this.token = '';
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  setuser(user: any) {
    console.log(user);
    this.userInformation = user;
  }

  loginuser(username: any, password: any) {
    const token = localStorage.getItem('token');
    var params = {
      email: username,
      password: password,
    };
    const bearer = 'Bearer ' + token;
    const headers = {
      Authorization: bearer,
      'Content-Type': 'application/json',
    };

    this.http
      .post<any>('http://localhost:3000/api/users/login', params, {
        headers: headers,
      })
      .subscribe(
        (data) => {
          console.log(data);
          if (data) {
            this.settoken(data.token);
            this.router.navigate(['/dashboard']);
          }
        },
        (err) => {
          alert('Invalid email and password');
        }
      );
  }
  logoutuser() {
    this.userInformation = [];
    this.token = [];
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
