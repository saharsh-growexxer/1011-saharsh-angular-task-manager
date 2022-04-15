import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginurl = 'http://localhost:3000/api/users/login';
  user: any;
  userInformation: any = [];
  usersdata = [{}];
  constructor(private router: Router, private http: HttpClient) {}

  setdata(user: any) {
    // console.log(user);
    let new_user = {
      name: user.name,
      email: user.email,
      password: user.password,
      age: user.age,
    };

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(new_user);
    //console.log(body);
    this.user = this.http
      .post('http://localhost:3000/api/users', body, {
        headers: headers,
      })
      .subscribe((res) => {
        // console.log('respose ' + res);
        localStorage.clear();
        const token = Object.values(res)[1];
        localStorage.setItem('token', token);
        //console.log('token set in localStorage', token);
      });

    this.usersdata.push(user);
    // console.log('userdata' + JSON.stringify(this.usersdata));
  }

  getuser() {
    this.userInformation = localStorage.getItem('currentUser') || null;
    this.userInformation = JSON.parse(this.userInformation);
    return JSON.stringify(this.userInformation);
  }
  setuser(token: string) {
    this.userInformation = {};
    this.userInformation = {
      token: token,
    };
    localStorage.setItem('currentUser', JSON.stringify(this.userInformation));
  }

  loginuser(username: any, password: any) {
    const token = localStorage.getItem('token');
    // console.log('token from localStorage', token);
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
            this.setuser(data.token);
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
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
