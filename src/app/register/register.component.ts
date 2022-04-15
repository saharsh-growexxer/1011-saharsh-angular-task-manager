import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn , ValidationErrors} from '@angular/forms';
import {LoginService} from '../core/services/login.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registereduser: any = [];
  constructor(private readonly login:LoginService) {}

  Registeronsubmit() {

      this.login.setdata(this.RegisterForm.value);

  }

  RegisterForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(75),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*'),
      // this.emailValidator,
    ]),
    password: new FormControl('', [Validators.required]),

    confirmpassword: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}
}
