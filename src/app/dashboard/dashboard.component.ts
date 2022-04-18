import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(
    public readonly login: LoginService,
    private activatedRoute: ActivatedRoute,
    public readonly taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTasks();
    this.activatedRoute.data.subscribe((response: any) => {
      this.user = JSON.stringify(response.login);
    });
  }
  deleteTask(id: string) {
    this.taskService.deleteTask(id);
    this.taskService.getAllTasks();
  }
  StatusTask(description: any, status: any, id: any) {
    let task = {
      description: description,
      completed: !status,
    };
    this.taskService.updateTask(task, id);
    this.taskService.getAllTasks();
  }
}
