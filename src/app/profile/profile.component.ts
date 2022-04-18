import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../core/services/login.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public readonly userService:UserService, public readonly login:LoginService, public readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
