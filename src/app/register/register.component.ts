import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { LoginService } from '../core/services/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registereduser: any = [];
  constructor(private readonly login: LoginService) {}

  Registeronsubmit() {
    this.login.setdata(this.RegisterForm.value);
  }

  passwordValidator(password: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass = password.test(control.value);
      return pass ? null : { forbiddenName: { value: control.value } };
    };
  }

  passwordMatchValidator(password: string, confirmpassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmpassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
  RegisterForm = new FormGroup(
    {
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
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Z\d@$!%*?&]{8,}$/i
        ),
      ]),
      confirmpassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator('password', 'confirmpassword') }
  );

  ngOnInit(): void {}
}
