import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  Route: any;
  User: any;
  UserRole: any;
  constructor(private _router: Router, private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.User = JSON.parse(localStorage.getItem('CurrentUser') ?? '');
    this.UserRole = localStorage.getItem('role');
  }

  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

}
