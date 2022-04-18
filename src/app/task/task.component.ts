import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {TaskService} from '../core/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  pageHeading: string = 'Update Task';
  tasksList: any;

  constructor(
    private route: ActivatedRoute,
    private TaskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  updateTaskForm = this.formBuilder.group({
    description: ['', [Validators.required, Validators.minLength(10)]],
    completed: ['', [Validators.required]],
  });

  get description() {
    return this.updateTaskForm.get('description');
  }

  get completed() {
    return this.updateTaskForm.get('completed');
  }

  onUpdateTask(updateTaskForm: any) {
    if (updateTaskForm.valid) {
      const routeParams = this.route.snapshot.params;
      const taskIdParamas = routeParams['taskId'];
      this.TaskService.updateTask(updateTaskForm.value, taskIdParamas);
    }
  }

  ngOnInit(): void {
  }

}
