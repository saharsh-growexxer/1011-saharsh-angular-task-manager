import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../core/services/login.service';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskStatus = [{ key: 'Pending', value: 'false' }, { key: 'Completed', value: 'true' }];
  constructor(public readonly login: LoginService, public readonly taskService: TaskService) { }

  createTaskForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    status: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
  }

  onCreateTask() {
    console.log(this.createTaskForm.value);
    this.taskService.createTask(this.createTaskForm.value);
  }
}
