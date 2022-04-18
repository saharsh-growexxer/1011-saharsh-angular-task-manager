import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {
  constructor(
    public readonly login: LoginService,
    public readonly userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  editProfileForm = new FormGroup({
    name: new FormControl(this.login?.userInformation?.name, [Validators.required, Validators.minLength(3)]),
    age: new FormControl(this.login?.userInformation?.age, [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{1}$')]),
  });

  ngOnInit(): void {}

  onEditProfile() {
    this.userService.updateUser(this.editProfileForm.value);
  }
}
