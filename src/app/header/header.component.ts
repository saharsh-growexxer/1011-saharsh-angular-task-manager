import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user:any;
  constructor(public readonly login: LoginService) { }

  ngOnInit(): void {
    this.user = this.login.getuser();
  }

  userdata= this.login.getuser()
  logout() {
    this.login.logoutuser();
  }
}
