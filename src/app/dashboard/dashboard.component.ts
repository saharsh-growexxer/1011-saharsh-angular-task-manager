import { Component, OnInit } from '@angular/core';
import {LoginService} from '../core/services/login.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:any;
  constructor(public readonly login:LoginService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response:any) =>{
      this.user = JSON.parse(response.auth);
    })
  }

}
