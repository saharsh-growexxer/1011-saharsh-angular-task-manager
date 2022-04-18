import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  tasks:any;
  task:any;

  constructor(private router: Router, private http: HttpClient, private login: LoginService) { }

  deleteTask(id: string) {
    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + token;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': bearer
    })

    this.http.delete<any>('http://localhost:3000/api/tasks/' + id, { headers: header })
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        }
      });
  }

  updateTask(task: any, id: string) {
    
    const params = {
      description: task.description,
      completed: task.completed,
    }
    console.log(params);
    console.log('id');
    console.log(id);

    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + token;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': bearer
    })

    this.http.patch<any>('http://localhost:3000/api/tasks/' + id, params, { headers: header })
      .subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        }
      });
  }

  createTask(task: any) {

    const params = {
      description: task.description,
      completed: task.status,
    }
    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + token;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': bearer
    })

    this.http.post<any>('http://localhost:3000/api/tasks', params, { headers: header })
      .subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        }
      });
  }

  getTask(id: string) {
    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + token;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': bearer 
    })

    this.http.get<any>('http://localhost:3000/api/tasks/' + id, { headers: header })
      .subscribe({
        next: data => {
          console.log(data);
          this.task = data;
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        }
      });
  }

  getAllTasks() {
    const token = localStorage.getItem('token');
    const bearer = 'Bearer ' + token;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': bearer
    })

    this.http.get<any>('http://localhost:3000/api/tasks', { headers: header })
      .subscribe({
        next: data => {
          this.setTasks(data)
        },
        error: error => {
          console.error('There was an error!', error);
          console.log('Invalid Credentials');
        }
      });
  }

  setTasks(tasks:any){
    this.tasks = tasks;
  }

}
