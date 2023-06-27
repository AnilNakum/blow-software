import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services';
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedMobileMenuName: string = 'freecom.dashboard'

  constructor(public commonService: CommonService, private _router: Router) {
    let Role = localStorage.getItem('role');
  }

  ngOnInit(): void {
  }

}
