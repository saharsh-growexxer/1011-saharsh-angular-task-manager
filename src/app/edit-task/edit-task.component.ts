import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../core/services/login.service';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskStatus = [{ key: 'Pending', value: false }, { key: 'Completed', value: true }];
  idFromRoute: any;
  task: any;
  constructor(public readonly login: LoginService, public readonly taskService: TaskService, private route: ActivatedRoute) { }

  updateTaskForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idFromRoute = routeParams.get('id');
    this.taskService.getTask(this.idFromRoute);
  }

  onUpdateTask() {
    console.log(this.taskService.task);
    console.log(this.updateTaskForm.value.description);
    console.log(this.taskService.task.completed);
    let task = {
      description: this.updateTaskForm.value.description,
      completed: this.taskService.task.completed,
    }
    this.taskService.updateTask(task,this.idFromRoute);
  }
}
