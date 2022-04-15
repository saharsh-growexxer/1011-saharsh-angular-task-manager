import { Component } from '@angular/core';
import { LoginService } from './core/services/login.service'
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '1011-saharsh-angular-task-manager';

  constructor(public readonly login: LoginService) {}
}
