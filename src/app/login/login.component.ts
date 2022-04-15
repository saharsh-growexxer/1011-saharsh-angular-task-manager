import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginOnSubmit(LoginForm:any) {
    
  }
  constructor(public readonly login:LoginService) { }

  ngOnInit(): void {
    }
  }

